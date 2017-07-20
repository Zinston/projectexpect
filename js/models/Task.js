var Task = Backbone.Model.extend({
	initialize: function() {
		this.expectations = new Expectations();

		this.listenTo(this.expectations, 'all', this.completeIfExpectationsComplete);
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

	addExpectation: function(expectation) {
		this.expectations.create(expectation);
		this.completeIfExpectationsComplete();
	},

	completeExpectation: function(expectation) {
		expectation.set('complete', true);
		this.completeIfExpectationsComplete();
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

		this.logTasksAndExp();
	},

	delete: function() {
		try {
			this.destroy();
		} catch (err) {
			console.log(err);
		};
	},

	deleteExpectation: function(expectation) {
		if (typeof expectation === "number") expectation = this.getExpectation(expectation);
		this.expectations.destroy(expectation);
		this.completeIfEmpty();
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
		this.expectations.each(function(expectation) {
			console.log(expectation.get('title') + ': ' + expectation.get('complete'));
		});
		console.log('task: ' + this.get('complete'));
	},

  	toggle: function() {
  		this.save({
  			complete: !this.get('complete')
  		});
  	}
});