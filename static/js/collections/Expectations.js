var Expectations = Backbone.Collection.extend({
	model: Expectation,

	addExpectation: function(expectation) {
		try {
			this.create(expectation);
		} catch (err) {
			console.log(err);
		}
	}
});
