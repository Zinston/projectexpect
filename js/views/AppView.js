var AppView = Backbone.View.extend ({
   
   el: '#projectapp',

   events: {
      'keypress #new-task': 'createTaskOnEnter',
      'keypress .new-expectation': 'createExpOnEnter'
    },

   // It's the first function called when this view is instantiated. 
   initialize: function() { 
      this.$taskInput = this.$('#new-task');

      tasks = new Tasks();
      this.listenTo(tasks, 'add', this.addTask);
   },

   addTask: function( task ) {
      var view = new TaskView({ model: task });
      $('#tasks').append( view.render().el );

      this.$expInput = this.$('.new-expectation');
      this.listenTo(task.get('expectations'), 'add', this.addExpectation)
   },

   addExpectation: function( expectation ) {
      var view = new ExpectationView({ model: expectation });
      $('.task').append( view.render().el );
   },

   createTaskOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$taskInput.val().trim() ) {
         return;
      }

      var newTask = new Task();
      newTask.set('title', this.$taskInput.val());
      tasks.add(newTask);

      this.$taskInput.val('');
   },

   createExpOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$expInput.val().trim() ) {
         return;
      }

      var newExp = new Expectation();
      newExp.set('title', this.$expInput.val());
      tasks.at(0).addExpectation(newExp);

      this.$expInput.val('');
   }
});

var tasks;
var ENTER_KEY = 13;

$(function() {
   new AppView();
});