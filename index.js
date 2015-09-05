var test = require('tape')
var stream = test.createStream({objectMode: true})
var path = require('path')


var ansi = {
//http://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html
//prefix \x1b || \033
	clr: '\x1b[0m',
	//blk: '\x1b[30m',
	red: '\x1b[31m',
	grn: '\x1b[32m',
	ylw: '\x1b[33m',
	//blu: '\x1b[34m',
	//mgt: '\x1b[35m',
	//cyn: '\x1b[36m',
	//wht: '\x1b[37m'
}

function pad4(n) {return ('    '+n).slice(-5)}
function pad8(n) {return ('        '+n).slice(-9)}
function color(txt, col) {return ansi[col]+txt+ansi.clr}


var res = []
var sumP = 0
var sumS = 0
var allE = []


stream.on('data', function(tap) {
	if (typeof tap   === 'string') console.log('comment: ' + tap)
	else if (tap.type === 'test' ) {
		res[tap.id] = (tap.id+'.  ').slice(0,4) + tap.name+'\n    '
	}
	else if (tap.type ===  'end' ) {
		res[tap.test] += '\x1b[0m'
		console.log(res[tap.test])
	}
	else if (tap.skip ===  true  ) sumS++, res[tap.test] += '\x1b[33ms'
	else if (tap.ok   ===  true  ) sumP++, res[tap.test] += '\x1b[32m·'
	else if (tap.error) {
		res[tap.test] += color('x','red')
		var operator = tap.expected ? tap.actual+' === '+tap.expected : tap.operator
		allE.push(pad8(tap.test)+'.'+tap.id+' - '+color(operator , 'red')+ ' : '+tap.error.message)
	}
	else console.log ('unknown tap result : ', tap)
});

stream.on('end', function() {
	console.log('Summary of the '+res.length+' test series(s)')
		console.log( color(pad4(sumP) + ' : Pass', 'grn') )
		console.log( color(pad4(sumS) + ' : Skip', 'ylw') )
		console.log( color(pad4(allE.length) + ' : Fail', 'red') )
		allE.forEach(function(msg) {	console.log( msg )	})
		console.log( pad4(sumP+sumS+allE.length) + ' : TOTAL TEST(S)' )
		console.log()
});

console.log('\nTEST RESULTS')
module.exports = test
