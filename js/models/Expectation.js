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
		this.destroy();
	},

	editTitle: function(newTitle) {
		this.save({
			title: newTitle
		});
	},

  	toggle: function() {
  		this.save({
  			complete: !this.get('complete')
  		});
  	}
});