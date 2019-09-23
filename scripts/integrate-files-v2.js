"use strict";

const fs = require('fs');
const testDataConfig = require("./v2-test-data-config.json");

let pathToKnora;

// expect three args
if (process.argv.length !== 3) {
    console.error("Usage: npm run integrate-vs-test-data <Knora project root>");
    process.exit(1);
} else {
    pathToKnora = process.argv[2];
    if (!fs.existsSync(pathToKnora)) {
        console.error("Specified path is not valid");
        process.exit(1);
    }
}

// copy test data
for (const file of testDataConfig["test-data"]) {
    const src = pathToKnora + file["source"];
    const dest = file["destination"];

    fs.copyFileSync(src, dest);

}

