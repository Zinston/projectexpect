var Tasks = Backbone.Collection.extend({
	model: Task,
	url: '/tasks_list'
});

var tasks = new Tasks();
