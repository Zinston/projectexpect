describe('Task', function() {
	var task;

	beforeEach(function() {
		task = new Task();
		thisExpectation = new Expectation();
	});

	it('should be able to complete', function() {
		expect(task.status).toBe('pending');

		task.complete()
		expect(task.status).toBe('complete');
	});

	it('should be able to add an expectation', function() {
		task.addExpectation(thisExpectation);

		expect(task.getExpectation(0)).toBe(thisExpectation);
	});

	it ('should be able to delete an expectation', function() {
		task.addExpectation(thisExpectation);
		task.deleteExpectation(0);

		expect(task.getExpectation(0)).not.toBeDefined();
	});

	it ('should be able to complete an expectation', function() {
		task.addExpectation(thisExpectation);
		expect(task.getExpectationStatus(0)).toBe('pending');

		task.completeExpectation(0);
		expect(task.getExpectationStatus(0)).toBe('complete');
	});

	it ('should complete when no expectation is present', function() {
		task.addExpectation(thisExpectation);
		task.addExpectation(new Expectation());
		expect(task.status).toBe('pending');

		task.deleteExpectation(0);
		expect(task.status).toBe('pending');
		task.deleteExpectation(0);
		expect(task.status).toBe('complete');
	});

	it ('should complete when all expectations are complete', function() {
		task.addExpectation(thisExpectation);
		task.addExpectation(new Expectation());
		expect(task.status).toBe('pending');

		task.completeExpectation(0);
		expect(task.status).toBe('pending');
		task.completeExpectation(1);
		expect(task.status).toBe('complete');
	});
});