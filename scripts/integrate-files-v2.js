"use strict";

const fs = require('fs');
const testDataConfig = require("./v2-test-data-config.json");

let pathToKnora;
let pathToGeneratedCode;

// expect three args
if (process.argv.length !== 4) {
    console.error("Usage: npm run integrate-vs-test-data <Knora project root> <generated client code>");
    process.exit(1);
} else {
    pathToKnora = process.argv[2];
    if (!fs.existsSync(pathToKnora)) {
        console.error("Specified path to Knora is not valid");
        process.exit(1);
    }
    pathToGeneratedCode = process.argv[3];
    if (!fs.existsSync(pathToGeneratedCode)) {
        console.error("Specified path to generated client code is not valid");
        process.exit(1);
    }
}

// copy static test data
for (const file of testDataConfig["static-test-data"]) {
    const src = pathToKnora + file["source"];
    const dest = file["destination"];

    fs.copyFileSync(src, dest);
}

// copy generated test data
for (const file of testDataConfig["generated-test-data"]) {
    const src = pathToGeneratedCode + file["source"];
    const dest = file["destination"];

    fs.copyFileSync(src, dest);
}

