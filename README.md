# DSP-JS-LIB &mdash; A library to easily connect to DSP-API (Knora)

[![npm version](https://badge.fury.io/js/%40dasch-swiss%2Fdsp-js.svg)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![CI](https://github.com/dasch-swiss/knora-api-js-lib/workflows/CI/badge.svg)](https://github.com/dasch-swiss/dsp-js-lib/actions?query=workflow%3ACI)
[![npm downloads](https://img.shields.io/npm/dt/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![license](https://img.shields.io/npm/l/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)

## Introduction

The purpose of DSP-JS-LIB is to facilitate the communication with [DSP-API (Knora)](https://www.knora.org) in web client software developed with TypeScript/JavaScript.
DSP-JS-LIB depends on [RxJS](https://rxjs.dev/guide/overview) and is web framework agnostic (it can be used with Angular, React, Vue.js etc.).

DSP-JS-LIB offers the following features:
 - handling of HTTP calls to connect to DSP-API
 - (de)serialisation from and to JSON-LD and so the web client can work with classes instead
 - methods that combine different HTTP calls to DSP-API into *one* method call
 - caching for different types of data so fewer HTTP calls to DSP-API have to be performed

## Release Notes

For the release notes 
see [GitHub releases](https://github.com/dasch-swiss/dsp-js-lib/releases).

## Getting started

### Install DSP-JS-LIB
Run `npm install @dasch-swiss/dsp-js --save` to install DSP-JS-LIB in your npm project.

### Install RxJS
`rxjs` is a peer dependency of this library and is not installed automatically when running `npm install`.
Note that DSP-JS-LIB requires a specific major version of `rxjs`.

Make sure that `rxjs` is installed in the required major version with the framework you are using, e.g. Angular.
Otherwise, install it with `npm install rxjs@6.x`.

### Start Using DSP-JS-LIB

In order to get started using DSP-JS-LIB, you have to create a `KnoraApiConfig` instance and pass it to `KnoraApiConnection`'s constructor:

```typescript
// import from DSP-JS-LIB
import { KnoraApiConfig, KnoraApiConnection, ApiResponseData, ApiResponseError, LoginResponse } from "@dasch-swiss/dsp-js";

// create the configuration
const config: KnoraApiConfig = new KnoraApiConfig("https", "knora.org");

// create a connection instance
const knoraApiConnection: KnoraApiConnection = new KnoraApiConnection(config);
```



## Developing DSP-JS-LIB

