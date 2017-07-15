var ExpectationView = Backbone.View.extend({
	tagName: 'li',
	className: 'expectation',

	events: {
      'click': 'completeExpectation'
    },

	template: _.template( $('#expectation-template').html() ),

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
    },

    completeExpectation: function(elem) {
    	this.model.toggle();
    	this.listenTo(this.model.get('complete'), 'change', this.$el.text( 'Completed' ))
    }
});