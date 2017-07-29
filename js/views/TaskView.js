var TaskView = Backbone.View.extend({
    tagName: 'ul',
    className: 'task',

    events: {
        'click #collapse'                       :   'toggleCollapse',
        'dblclick #task-name'         :   'edit',
        'keypress #edit-task'         :   'close',
        'click #delete'               :   'delete'
    },

    template: _.template( $('#task-template').html() ),

    initialize: function() {
        this.listenTo(this.model, 'change:complete', this.updateComplete);
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        console.log('Render TaskView');

        this.$el.html( this.template( this.model.attributes ) );

        if (this.$el.children('#new-expectation').length === 0) this.addExpectationsListView();

        this.updateComplete();

        this.model.logTasksAndExp();
        return this;
    },

    addExpectationsListView: function() {
        var view = new ExpectationsListView({ collection: this.model.expectations });
        this.$el.append( view.render().el );
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

    toggleCollapse: function() {
        this.$el.children('div').toggleClass('closed');
    }
});