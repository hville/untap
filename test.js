'use strict'
//TODO
var test = require('./index')


test('The Positive Serie', function(t) {
	t.true(true, 'true must be true')
	t.equal(1, 1, 'one must be one')

	t.end()
})

test('The Negative Serie', function(t) {
	t.false(false, 'false should be false')
	t.skip('test TODO')

	t.end()
})

