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

	completeTask: function(task) {
		task.set('complete', true);
		this.completeIfTasksComplete();
	},

	completeIfEmpty: function() {
		this.set('complete', this.isEmpty());
	},

	completeIfTasksComplete: function() {
		this.set('complete', this.tasksAreComplete());
	},

	deleteTask: function(task) {
		this.get('tasks').remove(task);
		this.completeIfEmpty();
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
	},

	isEmpty: function() {
		return !this.get('tasks').length;
	}
});
/*
 	initialize: function(){
      console.log('Project has been initialized.');
 	},

 	defaults: {
		complete: false
  	},

	allTasksComplete: function() {
		for (var i = 0; i < this.tasks.length; i++) {
			if (!this.taskisComplete(i)) {
				return false;
			};
		};
		return true;
	},

	complete: function() {
		this.set('complete', true);
	},

	completeIfAllTasksComplete: function() {
		this.set('complete', this.allTasksComplete());
	},

	completeIfEmpty: function() {
		this.set('complete', this.isEmpty());
	},

	completeTask: function(index) {
		this.getTask(index).complete();
		this.completeIfAllTasksComplete();
	},

	deleteTask: function(index) {
		this.get('tasks').splice(index, 1);
		this.completeIfEmpty();
	},

	getTask: function(index) {
		return this.get('tasks')[index];
	},

	isEmpty: function() {
		if (this.getTask(0)) return false;
		else return true;
	},

	taskisComplete: function(index) {
		return getTask(index).get('complete');
	}
});
*/