var Project = Backbone.Collection.extend({
	model: Task
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