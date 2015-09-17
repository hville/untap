var test = require('tape')

test.Test.prototype.closeTo =
test.Test.prototype.approxEqual = function (a, b, d, msg, extra) {
    this._assert(Math.abs(a-b) <= Math.abs(d), {
        message : msg ? msg : 'should be approx. equal +/-'+d,
        operator : 'approxEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

test.Test.prototype.notCloseTo =
test.Test.prototype.notApproxEqual = function (a, b, d, msg, extra) {
    this._assert(Math.abs(a-b) <= Math.abs(d), {
        message : msg ? msg : 'should not be approx. equal +/-'+d,
        operator : 'notApproxEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

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

function formatError(tap) {
	switch (tap.operator) {
		case 'equal': return JSON.stringify(tap.actual)+' === '+JSON.stringify(tap.expected)
		case 'notEqual': return JSON.stringify(tap.actual)+' !== '+JSON.stringify(tap.notExpected)

		case 'deepEqual': return JSON.stringify(tap.actual)+' {===} '+JSON.stringify(tap.expected)
		case 'notDeepEqual': return JSON.stringify(tap.actual)+' {!==} '+JSON.stringify(tap.notExpected)

		case 'deepLooseEqual': return JSON.stringify(tap.actual)+' {==} '+JSON.stringify(tap.expected)
		case 'notDeepLooseEqual': return JSON.stringify(tap.actual)+' {!=} '+JSON.stringify(tap.notExpected) //PR?

		case 'approxEqual': return JSON.stringify(tap.actual)+' =~ '+JSON.stringify(tap.expected)
		case '': return tap.operator
		default: tap.operator
	}
}


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
		allE.push(pad8('#'+tap.test)+'.'+tap.id+' - '+color(formatError(tap) , 'red')+ ' : '+tap.error.message)
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
