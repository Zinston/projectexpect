function Project() {
	this.tasks = [];
	this.status = 'pending';
};

Project.prototype.addTask = function(task) {
	this.tasks.push(task);
};

Project.prototype.getTask = function(index) {
	return this.tasks[index];
};

Project.prototype.deleteTask = function(index) {
	this.tasks.splice(index, 1);
	this.completeIfEmpty();
};

Project.prototype.getTaskStatus = function(index) {
	return this.getTask(index).status;
};

Project.prototype.completeTask = function(index) {
	this.getTask(index).complete();
	this.completeIfAllTasksComplete();
};

Project.prototype.complete = function() {
	this.status = 'complete';
};

Project.prototype.isEmpty = function() {
	if (this.getTask(0)) return false;
	else return true;
};

Project.prototype.allTasksComplete = function() {
	for (var i = 0; i < this.tasks.length; i++) {
		if (this.getTaskStatus(i) === 'pending') {
			return false;
		};
	};
	return true;
};

Project.prototype.completeIfEmpty = function() {
	if (this.isEmpty()) this.status = 'complete';
	else this.status = 'pending';
};

Project.prototype.completeIfAllTasksComplete = function() {
	if (this.allTasksComplete()) this.status = 'complete';
	else this.status = 'pending';
};