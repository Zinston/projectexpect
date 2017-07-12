describe('Project', function() {
	var project,
		thisTask;

	beforeEach(function() {
		thisExpectation = new Expectation();
		thisTask = new Task([thisExpectation]);
		project = new Project([thisTask]);
	});

	it('should be able to complete', function() {
		expect(project.get('complete')).toBe(false);

		project.complete();
		expect(project.get('complete')).toBe(true);
	});

	it('should be able to add a task', function() {
		project.add(thisTask);

		expect(project.getTask(0)).toBe(thisTask);
	});

	it('should be able to delete a task', function() {
		project.addTask(thisTask);
		project.deleteTask(0);

		expect(project.getTask(0)).not.toBeDefined();
	});

	it('should be able to complete a task', function() {
		project.addTask(thisTask);
		expect(project.taskIsComplete(0)).toBe(false);

		project.completeTask(0);
		expect(project.taskIsComplete(0)).toBe(true);
	});

	it ('should complete when no task is present', function() {
		project.addTask(thisTask);
		project.addTask(new Task());
		expect(project.get('complete')).toBe(false);

		project.deleteTask(0);
		expect(project.get('complete')).toBe(false);
		project.deleteTask(0);
		expect(project.get('complete')).toBe(true);
	});

	it ('should complete when all tasks are complete', function() {
		project.addTask(thisTask);
		project.addTask(new Task());
		expect(project.get('complete')).toBe(false);

		project.completeTask(0);
		expect(project.get('complete')).toBe(false);
		project.completeTask(1);
		expect(project.get('complete')).toBe(true);
	});
});