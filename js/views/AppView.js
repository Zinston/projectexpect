var AppView = Backbone.View.extend ({
   
   el: '#projectapp',

   events: {
      'keypress #new-task': 'createTaskOnEnter',
    },

   initialize: function() { 
      this.$taskInput = this.$('#new-task');

      tasks = new Tasks();
      this.listenTo(tasks, 'add', this.addTask);
      this.listenTo(tasks, 'remove', this.render);
   },

   render: function() {
      $('#tasks').html('');
      var self = this;
      tasks.forEach(function(task) {
         console.log(task.get('taskId'));
         self.addTask(task);
      });
      console.log("Render AppView");
   },

   addTask: function( task ) {
      var view = new TaskView({ model: task });
      $('#tasks').append( view.render().el );
   },

   createTaskOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$taskInput.val().trim() ) {
         return;
      }

      var newTask = new Task({title: this.$taskInput.val(), taskId: nextID++, validate: true});
      tasks.add(newTask);

      this.$taskInput.val('');
   }
});

var tasks;
var ENTER_KEY = 13;
var nextID = 0;

$(function() {
   new AppView();
});