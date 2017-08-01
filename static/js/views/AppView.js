var AppView = Backbone.View.extend ({
   
   el: '#projectapp',

   events: {
      'keypress #new-task': 'createTaskOnEnter',
    },

   initialize: function() { 
      this.$taskInput = this.$('#new-task');
      this.$taskInput.focus();

      this.$list = $('#tasks');

      this.listenTo(tasks, 'reset', this.addAll);
      this.listenTo(tasks, 'add', this.addTask);
      this.listenTo(tasks, 'remove', this.render);

      this.render();
   },

   render: function() {
      this.addAll();
      console.log("Render AppView");
   },

   addAll: function () {
      this.$list.html('');
      tasks.each(this.addTask, this);
   },

   addTask: function( task ) {
      var view = new TaskView({ model: task });
      $('#tasks').prepend( view.render().el );
   },

   createTaskOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$taskInput.val().trim() ) {
         return;
      }

      var newTask = new Task({title: this.$taskInput.val(), validate: true});
      tasks.create(newTask);

      this.$taskInput.val('');
   }
});

var ENTER_KEY = 13;

$(function() {
   new AppView();
});