var Task = Backbone.Collection.extend({
	model: Expectation,

	defaults: {
		complete: false
	}
});

/*

function Task() {
	this.expectations = [];
	this.status = 'pending';
}

Task.prototype.addExpectation = function(expectation) {
	this.expectations.push(expectation);
};

Task.prototype.getExpectation = function(index) {
	return this.expectations[index];
};

Task.prototype.deleteExpectation = function(index) {
	this.expectations.splice(index, 1);
	this.completeIfEmpty();
};

Task.prototype.getExpectationStatus = function(index) {
	return this.getExpectation(index).status;
};

Task.prototype.complete = function() {
	this.status = 'complete';
};

Task.prototype.completeExpectation = function(index) {
	this.getExpectation(index).complete();
	this.completeIfAllExpectationsComplete();
};

Task.prototype.isEmpty = function() {
	if (this.getExpectation(0)) return false;
	else return true;
};

Task.prototype.allExpectationsComplete = function() {
	for (var i = 0; i < this.expectations.length; i++) {
		if (this.getExpectationStatus(i) === 'pending') {
			return false;
		};
	};
	return true;
};

Task.prototype.completeIfEmpty = function() {
	if (this.isEmpty()) this.status = 'complete';
	else this.status = 'pending';
};

Task.prototype.completeIfAllExpectationsComplete = function() {
	if (this.allExpectationsComplete()) this.status = 'complete';
	else this.status = 'pending';
};

*/