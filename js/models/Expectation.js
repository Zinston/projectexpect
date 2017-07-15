var Expectation = Backbone.Model.extend({
	initialize: function(){
      console.log('Expectation has been initialized.');
 	},

 	defaults: {
		complete: false,
		title: 'No title'
  	},

  	toggle: function() {
  		this.complete = !this.complete;
  	}
});