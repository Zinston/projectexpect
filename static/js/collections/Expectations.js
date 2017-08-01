var Expectations = Backbone.Collection.extend({
	model: Expectation,
	url: '/expectations_list',

	addExpectation: function(expectation) {
		try {
			this.create(expectation);
		} catch (err) {
			console.log(err);
		}
	}
});
