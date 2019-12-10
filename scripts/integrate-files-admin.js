"use strict";

const fs = require('fs-extra');

let pathToGeneratedCode;

// expect three args
if (process.argv.length !== 3) {
    console.error("Usage: npm run integrate-admin-code <generated client code>");
    process.exit(1);
} else {
    pathToGeneratedCode = process.argv[2];
    if (!fs.existsSync(pathToGeneratedCode)) {
        console.error("Specified path to generated client code is not valid");
        process.exit(1);
    }
}

fs.copySync(pathToGeneratedCode + "/api/admin", "./src/api/admin");
fs.copySync(pathToGeneratedCode + "/models/admin", "./src/models/admin");
fs.copySync(pathToGeneratedCode + "/test-data/admin", "./test/data/api/admin");


