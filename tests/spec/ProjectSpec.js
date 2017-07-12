describe('Project', function() {
	var project,
		thisTask;

	beforeEach(function() {
		project = new Project();
		thisTask = new Task();
		thisExpectation = new Expectation();
	});

	it('should be able to get a task by index', function() {
		project.addTask(thisTask);
		project.addTask(new Task());

		expect(project.getTask(0)).toBe(thisTask);
		expect(project.getTask(1)).not.toBe(thisTask);
	});

	it('should be able to add a task', function() {
		project.addTask(thisTask);

		expect(project.getTask(0)).toBe(thisTask);
	});

	it('should be able to delete a task', function() {
		project.addTask(thisTask);
		project.deleteTask(thisTask);

		expect(project.getTask(0)).not.toBeDefined();
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