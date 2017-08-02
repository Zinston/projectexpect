from flask import (Flask,
                   abort,
                   jsonify,
                   render_template,
                   request,
                   session,
                   make_response)
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps, loads
from bson import ObjectId

from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2
import requests
import random, string

CLIENT_ID = json.loads(open('client_secrets.json', 'r').read())['web']['client_id']

app = Flask(__name__, static_url_path='/static')
app.debug = True

app.config['MONGO_DBNAME'] = 'tasksdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tasksdb'

mongo = PyMongo(app)

with app.app_context():
    TASKS = mongo.db.tasks
    USERS = mongo.db.users


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@app.route('/')
def index():
    tasks = [task for task in TASKS.find()]
    for task in tasks:
        task[u'_id'] = str(task[u'_id'])
    tasks = dumps(tasks)
    user = session
    return render_template('index.html', tasks=tasks, user=session)


@app.route('/tasks/', methods=['POST'])
def task_create():
    task = request.get_json()
    TASKS.insert(task)
    return _task_response(task)


@app.route('/tasks/<string:id>')
def task_read(id):
    task = _task_get_or_404(id)
    return _task_response(task)


@app.route('/tasks/<string:id>', methods=['PUT', 'PATCH'])
def task_update(id):
    task = _task_get_or_404(id)
    updates = request.get_json()
    updates.pop('_id', None)
    TASKS.update({'_id': ObjectId(id)}, updates);
    return _task_response(task)


@app.route('/tasks/<string:id>', methods=['DELETE'])
def task_delete(id):
    task = _task_get_or_404(id)
    TASKS.remove({'_id': ObjectId(id)});
    return _task_response(task)

def _task_get_or_404(id):
    oid = ObjectId(id)
    task = TASKS.find({'_id': oid})[0]
    if task is None:
        abort(404)
    print "----- ICI -----"
    print dumps(task)
    return task


def _task_response(task):
    return JSONEncoder().encode(task)


# LOGIN
@app.route('/login')
def show_login():
    state = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in xrange(32))
    session['state'] = state
    return render_template('login.html', STATE=state)

@app.route('/disconnect')
def disconnect():
    if 'provider' in session:
        if session['provider'] == 'google':
            gdisconnect()
            del session['gplus_id']
            del session['access_token']
        if session['provider'] == 'facebook':
            fbdisconnect()
            del session['facebook_id']

        del session['username']
        del session['email']
        del session['picture']
        del session['user_id']
        del session['provider']

        flash("Successfully disconnected.")
    else:
        flash("You were not logged in to begin with!")

    return redirect(url_for('index'))

## GOOGLE+

@app.route('/gconnect', methods=['POST'])
def gconnect():
    if request.args.get('state') != session['state']:
        response = make_response(json.dumps('Invalid state parameter'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    code = request.data
    try:
        # Upgrade the authorization code into a credentials object
        oauth_flow = flow_from_clientsecrets('client_secrets.json', scope='')
        oauth_flow.redirect_uri = 'postmessage'
        credentials = oauth_flow.step2_exchange(code)
    except FlowExchangeError:
        response = make_response(json.dumps('Failed to upgrade the authorization code.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    
    # Check that the access token is valid.
    access_token = credentials.access_token
    url = ('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=%s' % access_token)
    h = httplib2.Http()
    result = json.loads(h.request(url, 'GET')[1])
    # If there was an error in the access token info, abort.
    if result.get('error') is not None:
        response = make_response(json.dumps(result.get('error')), 500)
        response.headers['Content-Type'] = 'application/json'
    # Verify that the access token is used for the intended user.
    gplus_id = credentials.id_token['sub']
    if result['user_id'] != gplus_id:
        response = make_response(
            json.dumps("Token's user ID doesn't match given user ID."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    # Check to see if user is already logged in.
    stored_access_token = session.get('access_token')
    stored_gplus_id = session.get('gplus_id')
    if stored_access_token is not None and gplus_id == stored_gplus_id:
        response = make_response(json.dumps('Current user is already connected.'), 200)
        response.headers['Content-Type'] = 'application/json'

    # Store the access token in the session for later use.
    session['provider'] = 'google'
    session['access_token'] = credentials.access_token
    session['gplus_id'] = gplus_id

    # Get user info
    userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    params = {'access_token': credentials.access_token, 'alt': 'json'}
    answer = requests.get(userinfo_url, params=params)
    data = json.loads(answer.text)

    session['username'] = data['name']
    session['picture'] = data['picture']
    session['email'] = data['email']

    # Create user in the database if not there yet
    user_id = makeUserIfNew(session)

    # Generate success page
    output = successLoginPage(session)
    return output

# Disconnect - Revoke a current user's token and reset their session.
@app.route('/gdisconnect')
def gdisconnect():
    # Only disconnect a connected user.
    access_token = session.get('access_token')
    if access_token is None:
        response = make_response(json.dumps('Current user not connected.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    # Execute HTTP GET request to revoke current token.
    url = 'http://accounts.google.com/o/oauth2/revoke?token=%s' % access_token
    h = httplib2.Http()
    result = h.request(url, 'GET')[0]

    if result['status'] is not '200':
        # For whatever reason, the given token was invalid.
        response = make_response(json.dumps('Failed to revoke token for given user.'), 400)
        response.headers['Content-Type'] = 'application/json'
        return response


def createUser(session):
    newUser = {'name': session['username'],
               'email': session['email'],
               'picture': session['picture']}
    USERS.insert(newUser)
    user = USERS.find({'email': session['email']})[0]
    return str(user[u'_id'])

def getUserInfo(user_id):
    user = USERS.find({'_id': ObjectId(user_id)})[0]
    return user

def getUserID(email):
    try:
        user = session.query(User).filter_by(email=email).one()
        return user.id
    except:
        return None

def isNotLoggedIn():
    if 'username' not in session:
        return True

def makeAPICall(url, method):
    h = httplib2.Http()
    return h.request(url, method)[1]

def makeUserIfNew(session):
    user_id = getUserID(session['email'])
    if not user_id:
        user_id = createUser(session)
    session['user_id'] = user_id
    return user_id

def successLoginPage(session):
    output = ''
    output += '<h2>Welcome, '
    output += session['username']
    output += '!</h2>'
    output += '<img src="'
    output += session['picture']
    output += '" style="width: 100px; height: 100px; border-radius: 50px; -webkit-border-radius: 50px; -moz-border-radius: 50px;">'
    return output


if __name__ == '__main__':
    app.secret_key = 'make_this_secure_later'
    app.run(host='0.0.0.0', port=8000)
