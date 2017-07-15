var ExpectationView = Backbone.View.extend({
	tagName: 'li',
	className: 'expectation',

	events: {
      'dblclick'					: 'edit',
      'keypress #edit-expectation'	: 'close',
      'click #complete'				: 'complete',
      'click #delete'				: 'delete'
    },

	template: _.template( $('#expectation-template').html() ),

	initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'change:complete', this.updateComplete);
	},

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		this.updateComplete();
		return this;
    },

    updateComplete: function() {
    	if (this.model.get('complete')) this.$el.addClass('complete');
    	else this.$el.removeClass('complete');
    },

    complete: function() {
    	this.model.toggle();
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

    delete: function() {
    	this.model.delete();
    },

    edit: function() {
    	this.$el.children('#expectation-name').addClass('hidden');
        this.$el.children('#edit-expectation').removeClass('hidden');

        this.$el.children('#edit-expectation').focus();
    }
});