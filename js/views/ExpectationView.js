var ExpectationView = Backbone.View.extend({
	tagName: 'li',
	className: 'expectation',

	template: _.template( $('#expectation-template').html() ),

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
    }
});