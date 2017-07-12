function Expectation() {
	this.status = 'pending';
};

Expectation.prototype.complete = function() {
	this.status = 'complete';
};