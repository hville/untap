var tape = require('tape')

console.log('\nTHIS IS SOME TAPE.JS OUTPUT')

tape('This is a First tape.js Test that has skiped and failed tests', function(t) {
	t.equal(1,1)
	t.equal(1,2)
	t.skip('the tape.js skipped element')
	t.equal(1,1)
	t.end()
})

tape('This is a Second tape.js test that will timeout', function(t) {
	t.equal(1,1)
	t.skip('another tape.js skipped element')
	t.equal(1,1)
	t.equal(1,2)
})