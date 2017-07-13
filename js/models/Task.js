var Task = Backbone.Model.extend({
	initialize: function() {
		this.set('expectations', new Expectations()),
		_.bindAll(this,'expectationIsComplete');
	},

	defaults: {
		complete: false,
		title: 'No title'
	},

	addExpectation: function(expectation) {
		this.get('expectations').add(expectation);
	},

	completeExpectation: function(expectation) {
		expectation.set('complete', true);
		this.completeIfExpectationsComplete();
	},

	completeIfEmpty: function() {
		this.set('complete', this.isEmpty());
	},

	completeIfExpectationsComplete: function() {
		this.set('complete', this.expectationsAreComplete());
	},

	deleteExpectation: function(expectation) {
		if (typeof expectation === "number") expectation = this.getExpectation(expectation);
		this.get('expectations').remove(expectation);
		this.completeIfEmpty();
	},

	expectationIsComplete: function(expectation) {
		return expectation.get('complete');
	},

	expectationsAreComplete: function() {
		var self = this;
		var result = true;

		this.get('expectations').forEach(function(expectation) {
			if (!self.expectationIsComplete(expectation)) return result = false;
		});
		return result;
	},

	getExpectation: function(index) {
		return this.get('expectations').at(index);
	},

	isEmpty: function() {
		return !this.get('expectations').length;
	}
});