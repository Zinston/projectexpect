var ProjectRouter = Backbone.Router.extend({
  /* define the route and function maps for this router */
  routes: {
    "main" : "showMain",
    "project/:id" : "showProject"
  },

  showMain: function(){},

  showProject: function(id){}
});

new ProjectRouter();

Backbone.history.start();