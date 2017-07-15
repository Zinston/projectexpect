var ExpectationView = Backbone.View.extend({
	tagName: 'li',
	className: 'expectation',

	events: {
      'click #edit-expectation-btn': 'edit',
      'keypress #edit-expectation': 'close',
      'click #expectation-name': 'completeExpectation'
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

        this.$el.children('#expectation-name').css('display', 'block');
        this.$el.children('#edit-expectation').css('display', 'none');
        this.$el.children('#edit-expectation-btn').css('display', 'block');

        this.model.set('title', this.$edit.val());
    },

    edit: function() {
    	this.$el.children('#expectation-name').css('display', 'none');
        this.$el.children('#edit-expectation').css('display', 'inline');
        this.$el.children('#edit-expectation-btn').css('display', 'none');

        this.$el.children('#edit-expectation').focus();
    }
});