var Expectation = Backbone.Model.extend({
	initialize: function(){
      console.log('Expectation has been initialized.');
 	},

 	defaults: {
		complete: false,
  	},

  	validate: function(attributes){
	    if(attributes.title === undefined){
	        return "Remember to set a title for your expectation.";
	    }
    },

  	toggle: function() {
  		this.set({complete: !this.get('complete')});
  	}
});