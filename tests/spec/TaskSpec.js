describe('Task', function() {
	var task;

	beforeEach(function() {
		task = new Task();
		thisExpectation = new Expectation();
	});

	it('should be able to get an expectation by index', function() {
		task.addExpectation(thisExpectation);
		task.addExpectation(new Expectation());

		expect(task.getExpectation(0)).toBe(thisExpectation);
		expect(task.getExpectation(1)).not.toBe(thisExpectation);
	});

	it('should be able to add an expectation', function() {
		task.addExpectation(thisExpectation);

		expect(task.getExpectation(0)).toBe(thisExpectation);
	});

	it ('should be able to delete an expectation', function() {
		task.addExpectation(thisExpectation);
		task.deleteExpectation(thisExpectation);

		expect(task.getExpectation(0)).not.toBeDefined();
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