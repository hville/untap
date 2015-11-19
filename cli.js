#!/usr/bin/env node
var untap = require('./index.js')

var tapStream = process.stdin

tapStream.on('data', untap.data)
tapStream.on('end', untap.end)

