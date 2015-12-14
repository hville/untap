# untap

1. [Introduction](#introduction)
1. [Installation](#installation)
1. [Usage](#usage)
1. [Test](#test)
1. [License](#license)


## Introduction

shrinks and paints TAP test output
* Strips out the good news (ok...) and most of the extra line feeds
* Highlights the bad news in red (not ok...)
* Adds a one-line summary showing all passed, failed and skipped tests (eg. Summary: ..sx..x.)
* Includes a light cli interface to resolve files and directories
* No other dependencies, 5 files, all under 5kb for light local instals

There are multiple good reporters available but most have a relatively large set of dependencies and don't report skiped tests.	While `untap` works with any tap output, the initial design goal was to work with `tt` to provide a very light locally installed test suit for small projects.


## Installation

In node, from the project root folder type `npm i -D untap`.
You also need a testing library that produces TAP output (eg. tape, tt, tap)


## Usage

The main intended use case is for npm scripts in local installations.

inside the package.json file:
```
"scripts": {
	"test": "untap mytestdirectory"
}
```
`untap` supports piping of a test output (e.g. `tape test/mytestfile.js | untap`) or running multiple test files or test directories (e.g. `untap myTestDirectory mytestfile1.js test/mytestfile2.js`)


## Test

In node, from the project root type `npm test`. The tests include errors to see the output format.


## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
