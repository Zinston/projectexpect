var ExpectationView = Backbone.View.extend({
	tagName: 'li',
	className: 'expectation',

	template: _.template( $('#expectation-template').html() ),

	render: function() {
		var obj = this.model.attributes;
		obj.cid = this.model.cid;
		this.$el.html( this.template( obj ) );
		return this;
    }
});