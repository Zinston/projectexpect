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
    	try {
			this.destroy();
		} catch (err) {
			console.log(err);
		};
	},

	editTitle: function(newTitle) {
		try {
			this.save({
				title: newTitle
			});
		} catch (err) {
			console.log(err);
		};
	},

  	toggle: function() {
  		this.save({
  			complete: !this.get('complete')
  		});
  	}
});