var ExpectationView = Backbone.View.extend({
	tagName: 'li',
	className: 'expectation',

	events: {
      'dblclick': 'edit',
      'keypress #edit-expectation': 'close',
      'click #complete': 'completeExpectation'
    },

	template: _.template( $('#expectation-template').html() ),

	initialize: function() {
        this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
    },

    completeExpectation: function(elem) {
    	this.model.toggle();
    	this.$el.toggleClass('complete');
    },

    close: function() {
    	this.$edit = this.$('#edit-expectation');
        if ( event.which !== ENTER_KEY || !this.$edit.val().trim() ) {
            return;
        }

        this.$el.children('#expectation-name').toggleClass('hidden');
        this.$el.children('#edit-expectation').toggleClass('hidden');

        this.model.set('title', this.$edit.val());
    },

    edit: function() {
    	this.$el.children('#expectation-name').addClass('hidden');
        this.$el.children('#edit-expectation').removeClass('hidden');

        this.$el.children('#edit-expectation').focus();
    }
});