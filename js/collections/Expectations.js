var Expectations = Backbone.Collection.extend({
	model: Expectation,

	localStorage: new Backbone.LocalStorage('project-expectations')
});