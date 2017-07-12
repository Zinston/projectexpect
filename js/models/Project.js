var Project = Backbone.Model.extend({
	initialize: function() {
		this.set('tasks', new Tasks()),
		_.bindAll(this,'taskIsComplete');
	},

	defaults: {
		complete: false
	},

	addTask: function(task) {
		this.get('tasks').add(task);
	},

	completeIfEmpty: function() {
		this.set('complete', this.isEmpty());
	},

	completeIfTasksComplete: function() {
		this.set('complete', this.tasksAreComplete());
	},

	completeTask: function(task) {
		task.set('complete', true);
		this.completeIfTasksComplete();
	},

	deleteTask: function(task) {
		if (typeof task === "number") task = this.getTask(task);
		this.get('tasks').remove(task);
		this.completeIfEmpty();
	},

	getTask: function(index) {
		return this.get('tasks').at(index);
	},

	isEmpty: function() {
		return !this.get('tasks').length;
	},

	taskIsComplete: function(task) {
		return task.get('complete');
	},

	tasksAreComplete: function() {
		var self = this;
		var result = true;

		this.get('tasks').forEach(function(task) {
			if (!self.taskIsComplete(task)) return result = false;
		});
		return result;
	}
});