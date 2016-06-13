/* eslint no-console:0 */
var tt = require('tt')
var untap = require('../index')
untap.pipe()

console.log('\nTHIS IS SOME TT.JS OUTPUT\n')

tt('This is a First tt.js that all passes', function (t) {
	t.equal(1, 1)
	t.equal(1, 1)
	t.end()
})

tt('This is a Second tt.js Test that has skiped and failed tests', function (t) {
	t.equal(1, 1)
	t.equal(1, 2)
	t.equal(1, 1)
	t.end()
})

tt('This is a Second tt.js test that will timeout', function (t) {
	t.equal(1, 1)
	t.equal(1, 1)
	t.equal(1, 2)
})
