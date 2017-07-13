var TaskView = Backbone.View.extend({
	tagName: 'ul',
	className: 'task',

	template: _.template( $('#task-template').html() ),

	render: function() {
		var obj = this.model.attributes;
		obj.cid = this.model.cid;
		this.$el.html( this.template( obj ) );
		return this;
    }
});