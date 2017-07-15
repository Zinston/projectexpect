var TaskView = Backbone.View.extend({
	tagName: 'ul',
	className: 'task',

	events: {
      'keypress #new-expectation': 'createExpOnEnter'
    },

	template: _.template( $('#task-template').html() ),

	initialize: function() {
    	this.$input = this.$('#new-expectation');
        this.listenTo(this.model.get('expectations'), 'add', this.addExpectation);
    },

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
    },

    addExpectation: function( expectation ) {
    	var view = new ExpectationView({ model: expectation });
    	this.$el.append( view.render().el );
    },

    createExpOnEnter: function( event ) {
    	this.$input = this.$el.children('#new-expectation');
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        	return;
      	}

        var newExp = new Expectation();
        newExp.set('title', this.$input.val());
        tasks.at(this.model.get('id')).addExpectation(newExp);

        this.$input.val('');
   }
});