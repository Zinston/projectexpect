var ExpectationsListView = Backbone.View.extend({

	template: _.template( $('#expectations-list-template').html() ),

    events: {
        'keypress #new-expectation'   :   'createOnEnter'
    },

    initialize: function() {
        this.listenTo(this.collection, 'add', this.addExpectation);
        this.listenTo(this.collection, 'remove', this.removeExpectation);
    },

    render: function() {
        console.log('Render ExpectationsListView');

        this.$el.html( this.template( this.collection.models ) );

        // Display all expectations for this task (a new view for each)
        var self = this;
        this.collection.models.forEach(function(expectation) {
            self.addExpectation(expectation);
        });

        return this;
    },

    addExpectation: function( expectation ) {
        var view = new ExpectationView({ model: expectation });
        this.$el.append( view.render().el );
    },

    createOnEnter: function( event ) {
        this.$input = this.$el.children('#new-expectation');
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
            return;
        }

        var newExp = new Expectation({title: this.$input.val(), validate: true});
        this.collection.addExpectation(newExp);

        this.$input.val('');
    },

    removeExpectation: function() {
        this.render();
    }
});