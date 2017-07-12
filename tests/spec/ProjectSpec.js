describe('Project', function() {
	var project,
		thisTask;

	beforeEach(function() {
		project = new Project();
		thisTask = new Task();
	});

	it('should be able to complete', function() {
		expect(project.status).toBe('pending');

		project.complete();
		expect(project.status).toBe('complete');
	});

	it('should be able to add a task', function() {
		project.addTask(thisTask);

		expect(project.getTask(0)).toBe(thisTask);
	});

	it('should be able to delete a task', function() {
		project.addTask(thisTask);
		project.deleteTask(0);

		expect(project.getTask(0)).not.toBeDefined();
	});

	it('should be able to complete a task', function() {
		project.addTask(thisTask);
		expect(project.getTaskStatus(0)).toBe('pending');

		project.completeTask(0);
		expect(project.getTaskStatus(0)).toBe('complete');
	});

	it ('should complete when no task is present', function() {
		project.addTask(thisTask);
		project.addTask(new Task());
		expect(project.status).toBe('pending');

		project.deleteTask(0);
		expect(project.status).toBe('pending');
		project.deleteTask(0);
		expect(project.status).toBe('complete');
	});

	it ('should complete when all tasks are complete', function() {
		project.addTask(thisTask);
		project.addTask(new Task());
		expect(project.status).toBe('pending');

		project.completeTask(0);
		expect(project.status).toBe('pending');
		project.completeTask(1);
		expect(project.status).toBe('complete');
	});
});