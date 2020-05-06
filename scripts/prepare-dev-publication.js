"use strict";

const fs = require('fs-extra');

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

// add exports to index.ts
const indexFd = fs.openSync('index.ts', 'a' );

fs.writeSync(indexFd, 'export { MockOntology } from "./test/data/api/v2/mockOntology";\n');
fs.writeSync(indexFd, 'export { MockList } from "./test/data/api/v2/mockList";\n');
fs.writeSync(indexFd, 'export { MockResource } from "./test/data/api/v2/mock-resource";\n');

fs.closeSync(indexFd);

