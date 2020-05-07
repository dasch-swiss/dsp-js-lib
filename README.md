[![npm](https://img.shields.io/npm/v/@knora/api.svg)](https://www.npmjs.com/package/@knora/api) 
![](https://img.shields.io/npm/dt/@knora/api.svg?style=flat)
![](https://img.shields.io/bundlephobia/minzip/@knora/api.svg?style=flat)
![](https://img.shields.io/npm/l/@knora/api.svg?style=flat)
[![Build Status](https://travis-ci.org/dhlab-basel/knora-api-js-lib.svg?branch=master)](https://travis-ci.org/dhlab-basel/knora-api-js-lib)

# Purpose of this project

This JavaScript library allows a developer to implement the Knora API without knowing technical details about it.
We published this library as `@knora/api` on NPM for easy integration into JavaScript projects.
The library is developed in TypeScript and declaration files are part of the package to allow for integration with other TypeScript projects.

# Changelog

See file `CHANGLELOG.md`.

# Getting started

## Requirements

This library has been written to be used in any JavaScript project.
It may be integrated with any JavaScript framework/library of your choice, such as Angular, React, Vue.js, and more.

We recommend to install this library through NPM. This will make sure that all dependencies are installed.
At the moment, this library depends on `rxjs`, `json2typescript`, and `jsonld`.

In order to be able to integrate this library, you should have a basic understanding of an `Observable`.
All HTTP requests to Knora are performed using an `Observable` through the RxJS library.

## Installation

Run `npm install @knora/api --save` in the root directory of your project.

## Starting example

Below you may find a minimal example in TypeScript for the process of the user login.

If your IDE does not automatically help you with imports, these are the necessary files for the basic example:

```
import { KnoraApiConfig, KnoraApiConnection, ApiResponseData, ApiResponseError, LoginResponse } from "@knora/api";
```

Now, we will set up an instance of the class `KnoraApiConnection`. 
This instance can be your gateway to all API requests.
In most use cases, you will want to store this instance globally within your JavaScript application. 

```
// Set up a KnoraApiConnection instance. 
// We suggest to do this at your app entrypoint and store the instance globally.

const config: KnoraApiConfig = new KnoraApiConfig("https", "knora.org");
const knoraApiConnection: KnoraApiConnection = new KnoraApiConnection(config);
```

As soon as the basic configuration is done, you will be able to use the pre-defined methods provided by the KnoraApiConnection instance.
For example, you can login a user with a password as follows:

```
// Login the user to Knora.
// The method subscribe() is provided with two anonymous functions: 
// The first is launched in case of success, the second in case of failure.

knoraApiConnection.v2.auth.login("user", "password").subscribe(
    (response: ApiResponseData<LoginResponse>) => {
        console.log("Login successful!");
    },
    (response: ApiResponseError) => {
        console.error("Login failed!");
    }
);
```

Our library makes sure that session data (token) is stored within the KnoraApiConnection instance.
Any subsequent call after a successful login will be performed using the session.

## Test environment for Angular

`./test-framework` provides a ready-to-use test environment for Angular developers. See `./test-framework/README.md` for further instructions.

# Scripts for testing and deployment

This package provides the following short-hand scripts:

1. `npm run peer-deps`: Installs the project's peer dependencies. Peer dependencies are not installed with `npm install`, but have to be met before building or running the tests. 
2. `npm run test`: Runs the project's tests defined in `./karma.conf.js`. The coverage data is saved into the `./coverage/` folder.
3. `npm run build`: Builds the whole project without testing and puts the files into the `./build/` folder.
4. `npm run yalc-publish`: Executes 2 and publishes the package to the yalc app store.
5. `npm run npm-pack`: Executes 1, 2 and packs the `./build/` folder into an NPM tgz package. The package is moved into a `./dist/` folder.
6. `npm run npm-publish`: Executes 4 and publishes the package to the NPM store (runs in dry-run mode).

> Note: You need to install `yalc` globally by `npm install yalc -g` to use script number 3. In order to publish a package to NPM, you need to be logged in to NPM and you have to update the version in the `package.json`.

For further development with Knora the following scripts can be used:

1. `npm run integrate-admin-test-data <path-to-generated-client-code`: integrate generated test data for the Knora Admin API, 
see <https://docs.knora.org> -> Internals -> Development -> Generating Client Test Data.
2. `npm run integrate-v2-test-data <path-to-generated-client-code>`: this scripts integrates JSON-LD test data for Knora API v2.
3. `npm run expand-jsonld-test-data`: creates versions with expanded prefixes for Knora API v2 JSON-LD test data. 
see <https://docs.knora.org> -> internals -> development -> generating client apis (use it without `mock=true`).
4. `npm run prepare-dev-publication`: prepares a dev version of the library for publication. 
The dev versions contains mocks that produce tests data without a connection to Knora. The mocks are configured in `scripts/mock-exports.json`.

# Dependencies and Peer Dependencies

This library depends on `RxJS`, `jsonld`, and `json2typescript`. `jsonld` and `json2typescript` are only used internally and listed as dependencies.

`RxJS` is listed as a peer dependency and **not** installed with `nmp install`. It can be installed with `npm run peer-deps`.
`RxJS`'s `Observable` is used in this library's public API 
and has to be compatible with whatever version of `RxJS` is used in the productive environment, e.g. an Angular application.
This library works with `RxJS` as of version 6. See `rxjs.md` for details. 

# Publish a new version to NPM

Run `npm run npm-publish` as described above. The command runs `npm publish` in dry-run mode.
If everything looks good, remove the flag `--dry-run` from `package.json` and run `npm run npm-publish` to publish the new version. 

# Documentation

For the public API, see <https://dasch-swiss.github.io/knora-api-js-lib>.
For design documentation, see file `design-documentation.md`. 
