var AppView = Backbone.View.extend ({
   
   el: '#container', 

   // It's the first function called when this view is instantiated. 
   initialize: function() { 
      this.render(); 
   }, 

   // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content.
   //Like the Hello World in this case. 
   render: function() { 
      this.$el.html("<h1>Project Expect</h1>"); 
   } 
});  
var appView = new AppView();