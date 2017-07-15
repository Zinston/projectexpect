var TaskView = Backbone.View.extend({
	tagName: 'ul',
	className: 'task',

	events: {
      'keypress #new-expectation': 'createExpOnEnter',
      'dblclick #task-name': 'edit',
      'keypress #edit-task': 'close'
    },

	template: _.template( $('#task-template').html() ),

	initialize: function() {
    	this.$input = this.$('#new-expectation');
        this.listenTo(this.model.get('expectations'), 'add', this.addExpectation);
        this.listenTo(this.model, 'change:complete', this.completeTask);
        this.listenTo(this.model, 'change', this.render);
    },

	render: function() {
        var self = this;
		this.$el.html( this.template( this.model.attributes ) );
        this.model.get('expectations').forEach(function(expectation) {
            self.addExpectation(expectation);
        });
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
        tasks.at(this.model.get('id')).addExpectation(newExp);

        this.$input.val('');
   },

   completeTask: function() {
        this.$el.toggleClass('complete');
   },

   close: function() {
        this.$edit = this.$('#edit-task');
        if ( event.which !== ENTER_KEY || !this.$edit.val().trim() ) {
            return;
        }

        this.$el.children('#task-name').toggleClass('hidden');
        this.$el.children('#edit-task').toggleClass('hidden');

        this.model.set('title', this.$edit.val());
   },

   edit: function() {
        this.$el.children('#task-name').addClass('hidden');
        this.$el.children('#edit-task').removeClass('hidden');

        this.$el.children('#edit-task').focus();
   }
});