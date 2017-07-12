describe('Expectation', function() {
	var expectation;

	beforeEach(function() {
		expectation = new Expectation();
	})

	it('should be able to complete', function() {
		expect(expectation.status).toBe('pending');

		expectation.complete();
		expect(expectation.status).toBe('complete');
	})
});