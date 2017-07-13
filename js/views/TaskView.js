var TaskView = Backbone.View.extend({
	tagName: 'ul',
	className: 'task',

	template: _.template( $('#task-template').html() ),

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		console.log(this);
		return this;
    }
});