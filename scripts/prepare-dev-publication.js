"use strict";

const fs = require('fs-extra');

// adapt package.json
const pack = fs.readJsonSync('./package.json')
pack.files = pack.files.concat(
    [
        "test/**/*.d.ts",
        "test/**/*.js.map",
        "test/**/*.js",
        "test/**/*.json"]
);
console.log(pack.files)
fs.writeJsonSync('./package.json', pack);

// adapt tsconfig.json

// add exports to index.ts
