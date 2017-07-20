var TaskView = Backbone.View.extend({
    tagName: 'ul',
    className: 'task',

    events: {
        'keypress #new-expectation'   :   'createExpOnEnter',
        'dblclick #task-name'         :   'edit',
        'keypress #edit-task'         :   'close',
        'click #delete'               :   'delete'
    },

    template: _.template( $('#task-template').html() ),

    initialize: function() {
        this.$input = this.$('#new-expectation');
        this.listenTo(this.model.expectations, 'add', this.addExpectation);
        this.listenTo(this.model.expectations, 'remove', this.removeExpectation);
        this.listenTo(this.model, 'change:complete', this.updateComplete);
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        console.log('Render TaskView');

        this.$el.html( this.template( this.model.attributes ) );

        // Display all expectations for this task (a new view for each)
        var self = this;
        this.model.expectations.forEach(function(expectation) {
            self.addExpectation(expectation);
        });

        this.updateComplete();

        this.model.logTasksAndExp();
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

        var newExp = new Expectation({title: this.$input.val(), validate: true});
        tasks.get(this.model).addExpectation(newExp);

        this.$input.val('');
    },

    updateComplete: function() {
        if (this.model.get('complete')) this.$el.addClass('complete');
        else this.$el.removeClass('complete');
    },

    close: function() {
        this.$edit = this.$('#edit-task');
        if ( event.which !== ENTER_KEY || !this.$edit.val().trim() ) {
            return;
        }

        this.$el.children('#task-name').toggleClass('hidden');
        this.$el.children('#edit-task').toggleClass('hidden');

        this.model.editTitle(this.$edit.val());
    },

    delete: function() {
        this.model.delete();
    },

    edit: function() {
        this.$el.children('#task-name').addClass('hidden');
        this.$el.children('#edit-task').removeClass('hidden');

        this.$el.children('#edit-task').focus();
    },

    removeExpectation: function() {
        this.render();
    }
});