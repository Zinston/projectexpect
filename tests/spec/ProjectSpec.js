describe('Project', function() {
	var project,
		thisTask;

	beforeEach(function() {
		project = new Project();
		thisTask = new Task();
		thisExpectation = new Expectation();
	});

	it('should be able to add a task', function() {
		project.addTask(thisTask);

		expect(project.get('tasks').length).toBe(1);
	});

	it('should be able to delete a task', function() {
		project.addTask(thisTask);
		project.deleteTask(thisTask);

		expect(project.get('tasks').length).toBe(0);
	});

	it('should be able to complete', function() {
		expect(project.get('complete')).toBe(false);

		project.set('complete', true);
		expect(project.get('complete')).toBe(true);
	});

	it('should be able to complete a task', function() {
		project.addTask(thisTask);
		expect(project.taskIsComplete(thisTask)).toBe(false);

		project.completeTask(thisTask);
		expect(project.taskIsComplete(thisTask)).toBe(true);
	});

	it ('should complete when no task is present', function() {
		project.addTask(thisTask);
		var thatTask = new Task();
		project.addTask(thatTask);
		expect(project.get('complete')).toBe(false);

		project.deleteTask(thisTask);
		expect(project.get('complete')).toBe(false);
		project.deleteTask(thatTask);
		expect(project.get('complete')).toBe(true);
	});

	it ('should complete when all tasks are complete', function() {
		project.addTask(thisTask);
		var thatTask = new Task();
		project.addTask(thatTask);
		expect(project.get('complete')).toBe(false);

		project.completeTask(thisTask);
		expect(project.get('complete')).toBe(false);
		project.completeTask(thatTask);
		expect(project.get('complete')).toBe(true);
	});
});