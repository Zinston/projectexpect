from flask import (Flask,
                   abort,
                   jsonify,
                   render_template,
                   request)
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps, loads
from bson import ObjectId

app = Flask(__name__, static_url_path='/static')
app.debug = True

app.config['MONGO_DBNAME'] = 'tasksdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tasksdb'

mongo = PyMongo(app)

with app.app_context():
    TASKS = mongo.db.tasks


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
    return render_template('index.html', tasks=tasks)


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


if __name__ == '__main__':
    app.run(port=8000)
