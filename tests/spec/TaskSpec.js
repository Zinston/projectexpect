describe('Task', function() {
	var task;

	beforeEach(function() {
		task = new Task();
		thisExpectation = new Expectation();
	});

	it('should be able to add an expectation', function() {
		task.addExpectation(thisExpectation);

		expect(task.get('expectations').length).toBe(1);
	});

	it ('should be able to delete an expectation', function() {
		task.addExpectation(thisExpectation);
		task.deleteExpectation(thisExpectation);

		expect(task.get('expectations').length).toBe(0);
	});

	it('should be able to complete', function() {
		expect(task.get('complete')).toBe(false);

		task.set('complete', true);
		expect(task.get('complete')).toBe(true);
	});

	it ('should be able to complete an expectation', function() {
		task.addExpectation(thisExpectation);
		expect(task.expectationIsComplete(thisExpectation)).toBe(false);

		task.completeExpectation(thisExpectation);
		expect(task.expectationIsComplete(thisExpectation)).toBe(true);
	});

	it ('should complete when no expectation is present', function() {
		task.addExpectation(thisExpectation);
		var thatExpectation = new Expectation();
		task.addExpectation(thatExpectation);
		expect(task.get('complete')).toBe(false);

		task.deleteExpectation(thisExpectation);
		expect(task.get('complete')).toBe(false);
		task.deleteExpectation(thatExpectation);
		expect(task.get('complete')).toBe(true);
	});

	it ('should complete when all expectations are complete', function() {
		task.addExpectation(thisExpectation);
		var thatExpectation = new Expectation();
		task.addExpectation(thatExpectation);
		expect(task.get('complete')).toBe(false);

		task.completeExpectation(thisExpectation);
		expect(task.get('complete')).toBe(false);
		task.completeExpectation(thatExpectation);
		expect(task.get('complete')).toBe(true);
	});
});