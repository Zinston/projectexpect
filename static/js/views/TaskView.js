var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'task',

    events: {
        'keypress #task-name'         :   'close',
        'click #delete-task'          :   'delete'
    },

    template: _.template( $('#task-template').html() ),

    initialize: function() {
        this.listenTo(this.model, 'change:complete', this.updateComplete);
        this.listenTo(this.model, 'change', this.renderTitle);
        this.listenTo(this.model, 'change:expectations', this.model.logTasksAndExp);
        this.$el.collapsible();
    },

    render: function() {
        console.log('Render TaskView');

        this.$el.html( this.template( this.model.attributes ) );

        if (this.$el.children('#new-expectation').length === 0) {
            this.addExpectationsListView();
        }

        this.updateComplete('silent');

        this.model.logTasksAndExp();

        var self = this;
        _.defer(function() {
            self.$el.find('#new-expectation').focus();
        })
        return this;
    },

    renderTitle: function() {
        this.$el.children('#task-name').val(this.model.get('title'));
    },

    addExpectationsListView: function() {
        var view = new ExpectationsListView({ collection: this.model.expectations });
        this.$el.append( view.render().el );
    },

    updateComplete: function(ui) {
        if (this.model.get('complete')) {
            this.$el.children('.collapsible-header').addClass('complete');
            if (ui != 'silent') {
                //Materialize.toast("Congratulations, you completed a task!", 3000, 'rounded');
            };
        }
        else {
            this.$el.children('.collapsible-header').removeClass('complete');
        };
    },

    close: function() {
        this.$edit = this.$('#task-name');
        if ( event.which !== ENTER_KEY || !this.$edit.val().trim() ) {
            return;
        }

        this.model.editTitle(this.$edit.val());
        this.$el.find('#new-expectation').focus();
        Materialize.toast('Task updated to "' + this.model.get('title') + '"', 3000, 'rounded');

        this.model.logTasksAndExp();
    },

    delete: function() {
        this.model.delete();
        Materialize.toast("Task removed.", 3000, 'rounded');
    },

    edit: function() {
        this.$el.children('#task-name').addClass('hidden');
        this.$el.children('#edit-task').removeClass('hidden');

        this.$el.children('#edit-task').focus();
    }
});