# DSP-JS-LIB &mdash; A library to easily connect to Knora/DSP API

[![npm version](https://badge.fury.io/js/%40dasch-swiss%2Fdsp-js.svg)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![CI](https://github.com/dasch-swiss/knora-api-js-lib/workflows/CI/badge.svg)](https://github.com/dasch-swiss/knora-api-js-lib/actions?query=workflow%3ACI)
[![npm downloads](https://img.shields.io/npm/dt/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![license](https://img.shields.io/npm/l/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)

## Purpose of this project

This TypeScript library allows a developer to connect to the Knora API without knowing technical details about it.
We published this library as `@dasch-swiss/dsp-js` on NPM for easy integration into TypeScript/JavaScript projects.
The library is developed in TypeScript and declaration files are part of the package to allow for integration with other TypeScript projects.

## Changelog

See file `CHANGLELOG.md`.

## Getting started

### Requirements

This library has been written to be used in any TypeScript/JavaScript project.
It may be integrated with any JavaScript framework/library of your choice, such as Angular, React, Vue.js, and more.

We recommend to install this library through NPM. This will make sure that all dependencies are installed.
At the moment, this library depends on `rxjs`, `json2typescript`, and `jsonld`.

In order to be able to integrate this library, you should have a basic understanding of an `Observable`.
All HTTP requests to Knora are performed using an `Observable` through the RxJS library.

### Installation

Run `npm install @dasch-swiss/dsp-js --save` in the root directory of your project.
Make sure to install the lib's peer dependencies, see below.

### Dependencies and Peer Dependencies

This library depends on `RxJS`, `jsonld`, and `json2typescript`. `jsonld` and `json2typescript` are only used internally and listed as dependencies.

`RxJS` is listed as a peer dependency and **not** installed with `npm install`.
It can be installed with `npm run peer-deps` when you are working on this project.
`RxJS`'s `Observable` is used in this library's public API
and has to be compatible with whatever version of `RxJS` is used in the productive environment, e.g. an Angular application.
This library works with `RxJS`'s major version defined in `package.json` . See `rxjs.md` for details.

### Starting example

Below you may find a minimal example in TypeScript for the process of the user login.

If your IDE does not automatically help you with imports, these are the necessary files for the basic example:

```typescript
import { KnoraApiConfig, KnoraApiConnection, ApiResponseData, ApiResponseError, LoginResponse } from "@dasch-swiss/dsp-js";
```

Now, we will set up an instance of the class `KnoraApiConnection`.
This instance can be your gateway to all API requests.
In most use cases, you will want to store this instance globally within your JavaScript application.

```typescript
// Set up a KnoraApiConnection instance.
// We suggest to do this at your app entrypoint and store the instance globally.

const config: KnoraApiConfig = new KnoraApiConfig("https", "knora.org");
const knoraApiConnection: KnoraApiConnection = new KnoraApiConnection(config);
```

As soon as the basic configuration is done, you will be able to use the pre-defined methods provided by the KnoraApiConnection instance.
For example, you can login a user with a password as follows:

```typescript
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

### Test environment for Angular

`./test-framework` provides a ready-to-use test environment for Angular developers. See `./test-framework/README.md` for further instructions.

## Scripts for testing and deployment

This package provides the following short-hand scripts:

1. `npm run peer-deps`: Installs the project's peer dependencies. Peer dependencies are not installed with `npm install`, but have to be met before building or running the tests.
2. `npm run test`: Runs the project's tests defined in `./karma.conf.js`. The coverage data is saved into the `./coverage/` folder.
3. `npm run build`: Builds the whole project without testing and puts the files into the `./build/` folder.
4. `npm run yalc-publish`: Executes 2 and publishes the package to the yalc app store.
5. `npm run npm-pack`: Executes 1, 2 and packs the `./build/` folder into an NPM tgz package. The package is moved into a `./dist/` folder.
6. `npm run npm-publish`: Executes 4 and publishes the package to the NPM store (runs in dry-run mode).

> Note: You need to install [`yalc`](<https://www.npmjs.com/package/yalc>) globally by `npm install yalc -g` to use script number 4.

For further development with Knora, the following scripts can be used:

1. `npm run integrate-admin-test-data <path-to-generated-client-code>`: integrates generated test data for the Knora Admin API,
see <https://docs.knora.org> -> Internals -> Development -> Generating Client Test Data.
2. `npm run integrate-v2-test-data <path-to-generated-client-code>`: integrates JSON-LD test data for Knora API v2,
see <https://docs.knora.org> -> Internals -> Development -> Generating Client Test Data.
The test data files have to be added to `scripts/v2-test-data-config.json`: `source` refers to their location in the Knora test data directory structure,
`destination` refers to their location in this repo. The test data files are copied when running the script.
3. `npm run expand-jsonld-test-data`: creates versions with expanded prefixes for Knora API v2 JSON-LD test data.
4. `npm run prepare-dev-publication`: prepares a dev version of the library for publication.
The dev versions contains mocks that produce tests data without a connection to Knora.
The mocks are configured in `scripts/mock-exports.json`.
If you need a local version of this lib that contains the mocks, do the following:
   - `npm run prepare-dev-publication` to prepare a dev version.
   - `npm run yalc-publish` to publish a local build containing the mocks.

## Publish a new version to NPM

A new version will be published with each github release as it's part of Github actions' workflow. Please follow the steps below to prepare the next release:

- Create new branch from master called e.g. `prerelease/v1.0.0-rc.2` or `release/v2.0.0`
- Run one of the corresponding make commands:
  - `next-release-candidate`         updates version to next release candidate e.g. from 3.0.0-rc.0 to 3.0.0-rc.1 or from 3.0.0 to 3.0.1-rc.0
  - `prerelease-major`               updates version to next MAJOR as release candidate e.g. from 4.0.0 to 5.0.0-rc.0
  - `prerelease-minor`               updates version to next MINOR as release-candidate e.g. from 3.1.0 to 3.2.0-rc.0
  - `prerelease-patch`               updates version to next PATCH as release-candidate e.g. from 3.0.1 to 3.0.2-rc.0
  - `release-major`                  updates version to next MAJOR version e.g. from 3.0.0 to 4.0.0
  - `release-minor`                  updates version to next MINOR version e.g. from 3.0.0 to 3.1.0
  - `release-patch`                  updates version to next PATCH version e.g. from 3.0.0 to 3.0.1
- The make command will commit and push to github
- Update README and CHANGELOG if necessary and commit the changes
- Create new pull request and merge into master
- Draft new release on Github. This will build, test and publish the new package on npm. Additional it creates / overrides release notes on Github.

New package will be available on <https://www.npmjs.com/package/@dasch-swiss/dsp-js>

At the moment (2020-06) all releases contain mocked data.

## Documentation

For the public API, see <https://dasch-swiss.github.io/knora-api-js-lib>.
For design documentation, see file `design-documentation.md`.
