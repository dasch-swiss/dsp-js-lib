"use strict";

const fs = require('fs-extra');

const pack = fs.readJsonSync('./package.json');
const typedoc = fs.readJsonSync('./typedoc.json');

const version = pack.version;
typedoc.out = "docs/" + version.replace(".", "_");
fs.writeJsonSync('./typedoc.json', typedoc);
