# DSP-JS-LIB &mdash; A library to easily connect to DSP-API (Knora)

[![npm version](https://badge.fury.io/js/%40dasch-swiss%2Fdsp-js.svg)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![CI](https://github.com/dasch-swiss/knora-api-js-lib/workflows/CI/badge.svg)](https://github.com/dasch-swiss/dsp-js-lib/actions?query=workflow%3ACI)
[![npm downloads](https://img.shields.io/npm/dt/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![license](https://img.shields.io/npm/l/@dasch-swiss/dsp-js.svg?style=flat)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)

## Introduction

### Purpose of DSP-JS-LIB
The purpose of DSP-JS-LIB is to facilitate the communication with [DSP-API (Knora)](https://www.knora.org) in web clients developed with TypeScript/JavaScript.
DSP-JS-LIB depends on [RxJS](https://rxjs.dev/guide/overview) and is web framework agnostic (it can be used with Angular, React, Vue.js etc.).

DSP-JS-LIB offers the following features:
 - handling of HTTP calls to connect to DSP-API
 - (de)serialisation from and to JSON-LD so the web client can work with classes instead
 - methods that combine different HTTP calls to DSP-API into *one* method call
 - caching for different types of data so fewer HTTP calls to DSP-API have to be performed

### Basic Structure of DSP-JS-LIB
DSP-JS-LIB's architecture is based on endpoints that correspond to DSP-API's endpoints.

The following main endpoints are available through DSP-JS-LIB:
- **admin** (`AdminEndpoint`): getting and modifying users, projects, permissions etc.
- **v2** (`V2Endpoint`): requesting and modifying resources and values using DSP-API version 2.
- **system** (`SystemEndpoint`): DSP-API's health status.

Each of these main endpoints offers endpoints for specific operations.

#### Admin

- admin.usersEndpoint (`UsersEndpointAdmin`): offers methods to administer users.
- admin.groupsEndpoint (`GroupsEndpointAdmin`): offers methods to administer groups.
- admin.projectsEndpoint (`ProjectsEndpointAdmin`): offers methods to administer projects.
- admin.permissionsEndpoint (`PermissionsEndpointAdmin`): offers methods to administer permissions.
- admin.listsEndpoint (`ListsEndpointAdmin`): offers methods to administer lists.

#### V2

- v2.auth (`AuthenticationEndpointV2`): offers methods to authenticate.
- v2.onto (`OntologiesEndpointV2`): offers methods to get ontology information.
- v2.res (`ResourcesEndpointV2`): offers methods to work with resources.
- v2.values (`ValuesEndpointV2`): offers methods to work with values.
- v2.list (`ListsEndpointV2`): offers methods to retrieve list nodes and lists.
- v2.search (`SearchEndpointV2`): offers methods to search.
- v2.metadata (`ProjectMetadataEndpointV2`): offers methods to work with project metadata.

#### System

- system.healthEndpoint (`HealthEndpointSystem`): offers methods to get DSP-API's status.

Consult the [API docs](https://dasch-swiss.github.io/dsp-js-lib) for more details about the available endpoints.
For each main endpoint, you'll find a category in the API docs:
- admin: `Endpoint Admin Classes`
- v2: `Endpoint V2 Classes`
- system: `Endpoint System Classes`

You can also use the full text search to search for an end endpoint's class name, e.g., `ResourcesEndpointV2`.
See section [Getting started](#getting-started) for more usage information.

See [design documentation](design-documentation.md) for a detailed description of DSP-JS-LIB's design and architecture.

### RxJS Observables
DSP-JS-LIB's endpoints return observables to the client.
An `Observable` represents the result of an asynchronous request to DSP-API that will either succeed or fail.
An `Observable` is an [RxJS construct](https://rxjs.dev/guide/observable) that the client can subscribe to.

## Getting started

### Install DSP-JS-LIB
Run `npm install @dasch-swiss/dsp-js --save` to install DSP-JS-LIB in your npm project.

### Dependencies and Peer Dependencies
DSP-JS-LIB depends on [jsonld](https://www.npmjs.com/package/jsonld) and [json2typescript](https://www.npmjs.com/package/json2typescript).
These dependencies will be installed when you run `npm install` in your project.

[RxJS](https://www.npmjs.com/package/rxjs) is a peer dependency of this library and is **not installed** when running `npm install`.
Note that DSP-JS-LIB requires major version 6 of `rxjs`.

Make sure that the framework you are using, e.g., Angular,  requires major version 6 of RxJS to ensure the peer dependency will be met.
Otherwise, install it with `npm install rxjs@6.x --save`.

### Start Using DSP-JS-LIB
In order to get started using DSP-JS-LIB, you have to create a `KnoraApiConfig` instance and pass it to `KnoraApiConnection`'s constructor:

```typescript
// import from DSP-JS-LIB
import { KnoraApiConfig, KnoraApiConnection } from "@dasch-swiss/dsp-js";

// create the configuration
const config: KnoraApiConfig = new KnoraApiConfig("https", "api.dasch.swiss");

// create a connection instance
const knoraApiConnection: KnoraApiConnection = new KnoraApiConnection(config);
```

Once you have set up the connection instance, you can use any of DSP-JS-LIB's endpoints to perform requests to DSP-API:
```typescript
// formal example
knoraApiConnection.[mainEndpoint].[endpoint].[method(...)]

// admin users endpoint example, see UsersEndpointAdmin in API docs
knoraApiConnection.admin.usersEndpoint.getUserByIri("userIri").subscribe(...);

// v2 search endpoint example, see SearchEndpointV2 in API docs
knoraApiConnection.v2.search.doFulltextSearch("searchLabel").subscribe(...);

// system health endpoint example, see HealthEndpointSystem in API docs
knoraApiConnection.system.getHealthStatus().subscribe(...);
```

In the following full example, we are requesting a resource from DSP-API:

```typescript
// request a resource using the resources endpoint from v2
knoraApiConnection.v2.res.getResource(iri).subscribe(
  (resource: ReadResource) => {
    // "resource" represents a resource retrieved from DSP-API
    console.log(res);
  },
  (error) => {
    // if, for some reason, the request failed
    console.error(error);
  }
);
```

For more information about available endpoints and methods, consult the [API docs](https://dasch-swiss.github.io/dsp-js-lib).

## Release Notes
For the release notes 
see [GitHub releases](https://github.com/dasch-swiss/dsp-js-lib/releases).

## Developing DSP-JS-LIB
See [contribution guidelines](contribution.md).
