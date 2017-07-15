var Expectation = Backbone.Model.extend({
	initialize: function(){
      
 	},

 	defaults: {
		complete: false,
  	},

  	validate: function(attributes){
	    if(attributes.title === undefined){
	        return "Remember to set a title for your expectation.";
	    }
    },

    delete: function() {
		if (typeof expectation === "number") expectation = this.getExpectation(expectation);
		this.destroy();
		console.log(tasks);
	},

  	toggle: function() {
  		this.set({complete: !this.get('complete')});
  	}
});