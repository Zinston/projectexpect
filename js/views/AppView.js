var AppView = Backbone.View.extend ({
   
   el: '#projectapp',

   events: {
      'keypress #new-task': 'createOnEnter'
    },

   // It's the first function called when this view is instantiated. 
   initialize: function() { 
      this.$input = this.$('#new-task');

      tasks = new Tasks();
      this.listenTo(tasks, 'add', this.addTask);
   },

   addTask: function( task ) {
      var view = new TaskView({ model: task });
      $('#tasks').append( view.render().el );
   },

   createOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
         return;
      }

      var newTask = new Task();
      newTask.set('title', this.$input.val());
      tasks.add(newTask);

      this.$input.val('');
   },
});

var tasks;
var ENTER_KEY = 13;

$(function() {
   new AppView();
});