"use strict";

const fs = require('fs-extra');
const testDataConfig = require("./v2-test-data-config.json");

let pathToGeneratedCode;

// expect three args
if (process.argv.length !== 3) {
    console.error("Usage: npm run integrate-v2-test-data <generated client code>");
    process.exit(1);
} else {
    pathToGeneratedCode = process.argv[2];
    if (!fs.existsSync(pathToGeneratedCode)) {
        console.error("Specified path to generated client code is not valid");
        process.exit(1);
    }
}

// copy generated test data
for (const file of testDataConfig["generated-test-data"]) {
    const src = pathToGeneratedCode + file["source"];
    const dest = file["destination"];

    fs.copySync(src, dest);
}

