var Task = Backbone.Model.extend({
	initialize: function() {
		var localExp = this.get('expectations');
		this.expectations = new Expectations();
		if (localExp) localExp.forEach((exp) => this.expectations.add(exp));

		this.listenTo(this.expectations, 'all', this.completeIfExpectationsComplete);
		this.listenTo(this.expectations, 'add', this.updateExpectations);
		this.listenTo(this.expectations, 'remove', this.updateExpectations);
		this.listenTo(this.expectations, 'change', this.updateExpectations);
	},

	defaults: {
		complete: false,
		title: 'No title',
		taskId: 0
	},

	validate: function(attributes){
	    if(attributes.title === undefined || attributes.taskId === undefined){
	        return "Remember to set a title and an id for your task.";
	    }
    },

	completeIfEmpty: function() {
		this.save({
  			complete: this.isEmpty()
  		});
	},

	completeIfExpectationsComplete: function() {
		var self = this;
		this.save({
  			complete: self.expectationsAreComplete()
  		});
	},

	delete: function() {
		try {
			this.expectations.each((exp) => exp.destroy())
			this.destroy();
		} catch (err) {
			console.log(err);
		};
	},

	editTitle: function(newTitle) {
		this.save({
			title: newTitle
		});
	},

	expectationIsComplete: function(expectation) {
		return expectation.get('complete');
	},

	expectationsAreComplete: function() {
		var self = this;
		var result = true;

		this.expectations.forEach(function(expectation) {
			if (!self.expectationIsComplete(expectation)) return result = false;
		});
		return result;
	},

	getExpectation: function(index) {
		return this.expectations.at(index);
	},

	isEmpty: function() {
		return !this.expectations.length;
	},

	logTasksAndExp: function() {
		var taskTitle = this.get('title');
		var text = '';
		var lineLength = 'EXPECTATIONS'.length + 10;

		text += ' --- TASK --- \n';
		text += this.get('title') + ' : ';
		if (this.get('complete')) text += 'complete'
		else text += 'todo';
		text += '\n';

		text += '\n';

		text += " --- EXPECTATIONS --- \n";
		this.expectations.each(function(expectation) {
			text += expectation.get('title') + ' : ';
			if (expectation.get('complete')) text += 'complete'
			else text += 'todo';
			text += '\n';
		});

		console.log(text);
	},

  	toggle: function() {
  		this.save({
  			complete: !this.get('complete')
  		});
  	},

  	updateExpectations: function(expectation) {
		this.save({
			expectations: this.expectations
		});
  	}
});