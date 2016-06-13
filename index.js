/* eslint no-console: 0 */

// mini TAP parser
var passRE = /^ok/i
var failRE = /^not\sok/i
var bailRE = /^Bail\sout\!/i
var skipRE = /\# SKiP/i
var yamlRE = /\s*-{3}\s*|\s*\.{3}\s*/g
var lineRE = /\r+\n*|\r*\n+|\n+\r*|\n*\r+/g

// summary string
var summary = ''
var bailOut = false

// mini color format
var NORM = '\u001b[0m'
var RED = '\u001b[31m'

module.exports = {
	data: formatChunk,
	end: addSummary,
	pipe: pipe
}

function formatChunk (chk) {
	chk.toString().split(lineRE).forEach(formatRow)
}

function formatRow (row) {
	row = row.replace(yamlRE, '').replace(lineRE, '')	// strip EOL char

	if (failRE.test(row)) {
		summary += RED + 'x' + NORM
		console.log(RED + row + NORM)
	} else if (bailRE.test(row)) {
		bailOut = true
		summary += RED + 'X' + NORM
		console.log(RED + row + NORM)
	} else if (skipRE.test(row)) {
		summary += 's'
		console.log(row)
	} else if (passRE.test(row)) {
		summary += '.'
	}
	else if (row.length) console.log(row)
}

function addSummary () {
	console.log('\nSUMMARY: ' + summary)
	if (bailOut) throw Error('Test File Error')
}

// Modified from:
// https://gist.github.com/benbuckman/2758563
function pipe() {
	var stdoutWrite = process.stdout.write

	function pipedWrite(str /*, encoding, fd*/) {
		process.stdout.write = stdoutWrite
		formatChunk(str)
		process.stdout.write = pipedWrite
	}
	process.stdout.write = pipedWrite

	process.on('exit', function(err) {
		process.stdout.write = stdoutWrite
		if (err) console.log('\nERROR CODE: : ', err)
		addSummary()
	})
}
