var Task = Backbone.Model.extend({
	idAttribute: '_id',

	initialize: function() {
		var localExp = this.get('expectations');
		this.expectations = new Expectations();
		if (localExp) {
			localExp.forEach(function(exp){
				this.expectations.add(exp)
			}, this);
		};

		this.listenTo(this, 'sync', this.setMongoDBId);
		this.listenTo(this.expectations, 'all', this.completeIfExpectationsComplete);
		this.listenTo(this.expectations, 'add', this.updateExpectations);
		this.listenTo(this.expectations, 'remove', this.updateExpectations);
		this.listenTo(this.expectations, 'change', this.updateExpectations);
	},

	defaults: {
		complete: false,
		title: 'No title'
	},

    setMongoDBId: function(collection, resp) {
    	console.log('set mongodb');
    	console.log(resp);
    	var id = resp['_id']
    	var self = this;
		this.set('_id', id);
		console.log(this);
    },

	/*parse: function(response) {
		response = response['_id'];
	    this.set('_id', response);
	    console.log(this);

	    return response;
	},*/

	validate: function(attributes){
	    if(attributes.title === undefined){
	        return "Remember to set a title and an id for your task.";
	    }
    },

	completeIfEmpty: function() {
		this.save({
  			complete: this.isEmpty()
  		});
	},

	completeIfExpectationsComplete: function() {
		var self = this;
		this.save({
  			complete: self.expectationsAreComplete()
  		});
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
		}
	},

	expectationIsComplete: function(expectation) {
		return expectation.get('complete');
	},

	expectationsAreComplete: function() {
		var self = this;
		var result = true;

		this.expectations.forEach(function(expectation) {
			if (!self.expectationIsComplete(expectation)) {
				return result = false;
			};
		});
		return result;
	},

	getExpectation: function(index) {
		return this.expectations.at(index);
	},

	isEmpty: function() {
		return !this.expectations.length;
	},

	logTasksAndExp: function() {
		var taskTitle = this.get('title');
		var text = '';
		var lineLength = 'EXPECTATIONS'.length + 10;

		text += ' --- TASK --- \n';
		text += this.get('title') + ' : ';
		if (this.get('complete')) {
			text += 'complete'
		} else {
			text += 'todo';
		};
		text += '\n';

		text += '\n';

		text += " --- EXPECTATIONS --- \n";
		this.expectations.each(function(expectation) {
			text += expectation.get('title') + ' : ';
			if (expectation.get('complete')) {
				text += 'complete';
			} else {
				text += 'todo';
			};
			text += '\n';
		});

		console.log(text);
	},

  	toggle: function() {
  		this.save({
  			complete: !this.get('complete')
  		});
  	},

  	updateExpectations: function(expectation) {
		this.save({
			expectations: this.expectations
		});
  	}
});