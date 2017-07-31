var ExpectationView = Backbone.View.extend({
	tagName: 'div',
	className: 'expectation card-panel row hoverable',

	events: {
      'keypress #expectation-name'	: 'close',
      'click #complete'				: 'complete',
      'click #delete-exp'			: 'delete'
    },

	template: _.template( $('#expectation-template').html() ),

	initialize: function() {
        this.listenTo(this.model, 'change', this.renderTitle);
        this.listenTo(this.model, 'change:complete', this.updateComplete);
	},

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		this.updateComplete();
		console.log("Render ExpectationView");
		return this;
    },

    renderTitle: function() {
        this.$el.children('#expectation-name').val(this.model.get('title'));
    },

    updateComplete: function() {
    	if (this.model.get('complete')) {
            this.$el.addClass('complete');
        }
    	else {
            this.$el.removeClass('complete');
        }
    },

    complete: function() {
    	this.model.toggle();
    },

    close: function() {
    	this.$edit = this.$('#expectation-name');
        if ( event.which !== ENTER_KEY || !this.$edit.val().trim() ) {
            return;
        }
        
        this.model.editTitle(this.$edit.val());
        console.log('ok');
        Materialize.toast("Expectation updated to " + this.model.get('title'), 3000, 'rounded');
    },

    delete: function() {
    	this.model.delete();
        Materialize.toast("Expectation removed.", 3000, 'rounded');
    },

    edit: function() {
    	this.$el.children('#expectation-name').focus();
    }
});