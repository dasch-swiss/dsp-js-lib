"use strict";

const fs = require('fs-extra');

let pathToGeneratedCode;

// expect three args
if (process.argv.length !== 3) {
    console.error("Usage: npm run integrate-system-code <generated client code>");
    process.exit(1);
} else {
    pathToGeneratedCode = process.argv[2];
    if (!fs.existsSync(pathToGeneratedCode)) {
        console.error("Specified path to generated client code is not valid");
        process.exit(1);
    }
}

fs.copySync(pathToGeneratedCode + "/system", "./test/data/api/system");

fs.moveSync('./test/data/api/system/health/response-headers.json', './test/data/api/system/health/response-headers.txt')
