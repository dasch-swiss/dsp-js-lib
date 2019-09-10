"use strict";

const fs = require('fs');
const jsonld = require("jsonld");


const expandJsonLD = (path) => {

    fs.readdir(path, (err, files) => {

        files.forEach(
            (jsondldFilename, index) => {


                const jsonldFile = fs.readFileSync(path + jsondldFilename, 'utf8', 'r+');

                const expandedPromise = jsonld.compact(JSON.parse(jsonldFile), {});
                expandedPromise.then(
                    expanded => {
                        // write fo file with "expanded" suffix
                        fs.writeFileSync( path + jsondldFilename.substring(0, jsondldFilename.length-5) + "-expanded.json", JSON.stringify(expanded), "utf8");
                    },
                    err => {
                        console.log("JSONLD failed " + jsondldFilename + " \n" + err);
                    }
                );
            }
        );

    });
};

const ontologiesPath = "test/data/api/v2/ontologies/";
// const resourcesPath = "test/data/api/v2/resources/";

expandJsonLD(ontologiesPath);
