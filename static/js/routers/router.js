var ProjectRouter = Backbone.Router.extend({
  /* define the route and function maps for this router */
  routes: {
    "tasks" : "showMain",
    "task/:id" : "showTask"
  },

  showMain: function(){},

  showTask: function(id){}
});

new ProjectRouter();

Backbone.history.start();