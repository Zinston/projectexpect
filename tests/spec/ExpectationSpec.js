describe('Expectation', function() {
	var expectation;

	beforeEach(function() {
		expectation = new Expectation();
	})

	it('should be able to complete', function() {
		expect(expectation.get('complete')).toBe(false);

		expectation.set('complete', true);
		expect(expectation.get('complete')).toBe(true);
	})
});