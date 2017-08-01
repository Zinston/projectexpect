from flask import (Flask,
    			   abort,
    			   jsonify,
    			   render_template,
    			   request)

tasks = []

app = Flask(__name__, static_url_path='/static')
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks/', methods=['POST'])
def task_create():
    task = request.get_json()
    task['id'] = len(tasks)
    tasks.append(task)
    return _task_response(task)


@app.route('/tasks/<int:id>')
def task_read(id):
    task = _task_get_or_404(id)
    return _task_response(task)


@app.route('/tasks/<int:id>', methods=['PUT', 'PATCH'])
def task_update(id):
    task = _task_get_or_404(id)
    updates = request.get_json()
    task.update(updates)
    return _task_response(task)


@app.route('/tasks/<int:id>', methods=['DELETE'])
def task_delete(id):
    task = _task_get_or_404(id)
    tasks[id] = None
    return _task_response(task)


def _task_get_or_404(id):
    if not (0 <= id < len(tasks)):
        abort(404)
    task = tasks[id]
    if task is None:
        abort(404)
    return task


def _task_response(task):
    return jsonify(**task)


if __name__ == '__main__':
    app.run(port=8000)