#!/usr/bin/env node
/*global process */

var path = require('path')
var fs = require('fs')
var child_process = require('child_process')
var untap = require('./index.js')

var args = process.argv.slice(2)

if (args.length) runTest()
else formatTest(process.stdin)

function runTest () {
	var files = []
	args.forEach(function (arg) {
		var file = resolveArg(arg)
		if (file) files = files.concat(file)
	})
	if (files.length) {
		child_process.exec('node ' + files.join(' & node '), function (error, stdout, stderr) {
			untap.data(stdout)
			if (stderr) untap.data('Bail out! ' + stderr)
			if (error !== null) console.log('\nERROR: : ', error)
			untap.end()
		})
	}
}

function formatTest (tapStream) {

	tapStream.on('data', untap.data)
	tapStream.on('end', untap.end)
}

function resolveArg (arg) {
	var fullPath = path.resolve(process.cwd(), arg)
	var type = pathType(fullPath)

	if (isJS(arg) && type === 'file') return fullPath
	if (type === 'directory') return getDir(fullPath)
	if (!isJS(arg)) return resolveArg(arg + '.js')
	console.log ('WARNING: %s is not a valid file name', arg)
}

function isJS (fileName) { return /\.js$/.test(fileName) }

function pathType (fullPath) {
	try {
		var stats = fs.statSync(fullPath)
		if (stats.isFile()) return 'file'
		if (stats.isDirectory()) return 'directory'
	} catch (e) {	/* ignore invalid file|directory names */ }
}

function getDir (dirName) {
	return fs.readdirSync(dirName).filter(isJS).map(function (n) {
		return path.resolve(dirName, n)
	})
}
