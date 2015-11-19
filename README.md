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


## Installation

In node, from the project root folder type `npm install --save untap`.
You also need a testing library that produces TAP output (eg. tape, tt, tap)


## Usage

The main intended use case is for npm scripts in local installations.

inside the package.json file:
```
  "scripts": {
    "test": "npm run tape && npm run tt",
    "tape": "tape test/tape.js | untap",
    "tt": "node test/tt.js | untap",
    "all": "tape test/**/*.js | untap"
  }
```

at the command line type `npm test` or `npm run all`


## Test

In node, from the project root type `npm test`. The tests are only visual to see that the output is as intended.


## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
