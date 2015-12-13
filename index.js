// mini TAP parser
var passRE = /^ok/i
var failRE = /^not ok/i // ^not ok|^#\s*fail/i
var skipRE = /\# SKiP/i
var yamlRE = /\s*-{3}\s*|\s*\.{3}\s*/g // /\s+\-{3}\s+(.*)\s*\.{3}\s*/ // /\s+---\s*\n(.*\n)\s+\.{3}/
var lineRE = /\r+\n*|\r*\n+|\n+\r*|\n*\r+/g

// summary string
var summary = ''

// mini color format
var NORM = '\u001b[0m'
var RED = '\u001b[31m'

function formatChunk (chk) {
  chk.toString().split(lineRE).forEach(formatRow)
}

function formatRow (row) {
  row = row.replace(yamlRE, '').replace(lineRE, '')  // strip EOL char

  if (failRE.test(row)) {
    summary += RED + 'x' + NORM
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
}

module.exports = {
  data: formatChunk,
  end: addSummary
}
