'use strict'
//TODO
var test = require('./index')


test('The Positive Serie', function(t) {
	t.true(false, 'true must be true')
	t.equal(1, 1, 'one must be one')
	t.equal('2', 2, 'two must be two')
	t.skip('test TODO')
	t.same([1], [1], 'unit arrays must be the same')
	t.same(['1'], [1], 'unit arrays must be the same')

	t.end()
})

test('The Negative Serie', function(t) {
	t.false(true, 'false should be false')
	t.skip('test TODO')
	t.fail('failed without trying')
	t.error('error', 'error must be falsy')
	t.notEqual(1, 1, 'should be different')
	t.notSame([1], [1], 'should be different')

	t.end()
})

