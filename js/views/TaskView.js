var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'task',

    events: {
        'keypress #task-name'         :   'close',
        'click #delete'               :   'delete'
    },

    template: _.template( $('#task-template').html() ),

    initialize: function() {
        this.listenTo(this.model, 'change:complete', this.updateComplete);
        this.listenTo(this.model, 'change', this.renderTitle);
        this.$el.collapsible();
    },

    render: function() {
        console.log('Render TaskView');

        this.$el.html( this.template( this.model.attributes ) );

        if (this.$el.children('#new-expectation').length === 0) {
            this.addExpectationsListView();
        }

        this.updateComplete();

        this.model.logTasksAndExp();
        return this;
    },

    renderTitle: function() {
        this.$el.children('#task-name').val(this.model.get('title'));
    },

    addExpectationsListView: function() {
        var view = new ExpectationsListView({ collection: this.model.expectations });
        this.$el.append( view.render().el );
        this.$el.collapsible('open');
    },

    updateComplete: function() {
        if (this.model.get('complete')) {
            this.$el.children('.collapsible-header').addClass('green lighten-4');
        }
        else {
            this.$el.children('.collapsible-header').removeClass('green lighten-4');
        }
    },

    close: function() {
        this.$edit = this.$('#task-name');
        if ( event.which !== ENTER_KEY || !this.$edit.val().trim() ) {
            return;
        }

        this.model.editTitle(this.$edit.val());
        Materialize.toast("Task title updated to " + this.model.get('title'), 3000, 'rounded');
        console.log("Task title updated to " + this.model.get('title'));
    },

    delete: function() {
        this.model.delete();
    },

    edit: function() {
        this.$el.children('#task-name').addClass('hidden');
        this.$el.children('#edit-task').removeClass('hidden');

        this.$el.children('#edit-task').focus();
    }
});