var AppView = Backbone.View.extend ({
   
   el: '#projectapp', 

   // It's the first function called when this view is instantiated. 
   initialize: function() { 
      tasks = new Tasks();
      this.listenTo(tasks, 'add', this.addTask);
   },

   addTask: function( task ) {
      var view = new TaskView({ model: task });
      $('#tasks').append( view.render().el );
   }
});

var tasks;

$(function() {
   new AppView();
});