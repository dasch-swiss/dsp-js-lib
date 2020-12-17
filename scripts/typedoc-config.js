"use strict";

const fs = require('fs-extra');

// append version number to typedoc's out dir config,
// so that each release has its own API docs directory on gh pages
const pack = fs.readJsonSync('./package.json');
const typedoc = fs.readJsonSync('./typedoc.json');

const version = pack.version;
typedoc.out = "docs/" + version.replaceAll(".", "_"); // e.g., 1.0.0 -> 1_0_0 (out: docs/1_0_0)
fs.writeJsonSync('./typedoc.json', typedoc);
