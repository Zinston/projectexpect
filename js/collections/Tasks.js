var Tasks = Backbone.Collection.extend({
	model: Task,

	localStorage: new Backbone.LocalStorage('project-tasks'),
});

var tasks = new Tasks();