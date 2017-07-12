describe('Task', function() {
	var task;

	beforeEach(function() {
		task = new Task();
		thisExpectation = new Expectation();
	});

	it('should be able to add an expectation', function() {
		task.add(thisExpectation);

		expect(task.length).toBe(1);
	});

	it ('should be able to remove an expectation', function() {
		task.add(thisExpectation);
		task.remove(thisExpectation);

		expect(task.length).toBe(0);
	});

	it('should be able to complete', function() {
		expect(task.get('complete')).toBe(false);

		task.set('complete', true);
		expect(task.get('complete')).toBe(true);
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
		expect(task.get('complete')).toBe('pending');

		task.deleteExpectation(0);
		expect(task.get('complete')).toBe('pending');
		task.deleteExpectation(0);
		expect(task.get('complete')).toBe('complete');
	});

	it ('should complete when all expectations are complete', function() {
		task.addExpectation(thisExpectation);
		task.addExpectation(new Expectation());
		expect(task.get('complete')).toBe('pending');

		task.completeExpectation(0);
		expect(task.get('complete')).toBe('pending');
		task.completeExpectation(1);
		expect(task.get('complete')).toBe('complete');
	});
});