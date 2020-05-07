"use strict";

const fs = require('fs-extra');
const testExports = require('./mock-exports.json')

// adapt package.json
const pack = fs.readJsonSync('./package.json');
pack.files = pack.files.concat(
    [
        "test/**/*.d.ts",
        "test/**/*.js.map",
        "test/**/*.js",
        "test/**/*.json"]
);
fs.writeJsonSync('./package.json', pack);

// adapt tsconfig.json
const tsconf = fs.readJsonSync('./tsconfig.json');
// get index of "test" in excluded files array
const indexOfTest = tsconf.exclude.indexOf('test')
tsconf.exclude.splice(indexOfTest, 1);
fs.writeJsonSync('./tsconfig.json', tsconf);

// add exports for mock files to index.ts
const indexFd = fs.openSync('./index.ts', 'a');

testExports.forEach(
    (exp => {
        fs.writeSync(indexFd, exp);
    })
);

fs.closeSync(indexFd);

