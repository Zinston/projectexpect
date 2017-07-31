var AppView = Backbone.View.extend ({
   
   el: '#projectapp',

   events: {
      'keypress #new-task': 'createTaskOnEnter',
    },

   initialize: function() { 
      this.$taskInput = this.$('#new-task');
      this.$taskInput.focus();

      this.listenTo(tasks, 'add', this.addTask);
      this.listenTo(tasks, 'remove', this.render);

      // Initialize the tasks from localStorage
      tasks.fetch();
   },

   render: function() {
      $('#tasks').html('');
      var self = this;
      tasks.forEach(function(task) {
         self.addTask(task);
      });
      console.log("Render AppView");
   },

   addTask: function( task ) {
      var view = new TaskView({ model: task });
      $('#tasks').prepend( view.render().el );
   },

   createTaskOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$taskInput.val().trim() ) {
         return;
      }

      var newTask = new Task({title: this.$taskInput.val(), taskId: nextID++, validate: true});
      tasks.create(newTask);

      this.$taskInput.val('');
   }
});

var ENTER_KEY = 13;
var nextID = 0;

$(function() {
   new AppView();
});