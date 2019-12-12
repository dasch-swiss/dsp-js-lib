# Design Documentation

## Introduction

The purpose of this library is facilitating the use of the Knora API in web client development. 
It offers a convenient way to communicate with the Knora API without knowing specific technical details.  

## Endpoints

An `Endpoint` offers methods to communicate with the Knora API. At the current state, two main groups of endpoints have been implemented:

- `AdminEndpoint`: communication with Knora admin API: `UsersEndpoint`, `GroupsEndpoint`, `ProjectsEndpoint`, `PermissionsEndpoint`
- `V2Endpoint`: communication with Knora API v2: `AuthenticationEndpoint`, `OntologiesEndpoint`, `ResourcesEndpoint`, `ListsEndpoint`, `SearchEndpoint` 


### Knora Admin API Endpoints

The Knora Admin API is used to administrate projects in Knora. This also includes management of users and groups as well as permissions.
The Knora API relies on JSON as an exchange format.

#### Users

The `UsersEndpoint` deals with all requests related to creating, reading, updating and deleting users.
It communicates directly with the Knoa API, taking care of deserializing JSON responses received from Knora and serializing payloads submitted in requests to JSON. 

#### Groups

The `GroupsEndpoint` deals with all requests related to creating, reading, updating and deleting groups.
It communicates directly with the Knoa API, taking care of deserializing JSON responses received from Knora and serializing payloads submitted in requests to JSON. 

#### Projects

The `ProjectsEndpoint` deals with all requests related to creating, reading, updating and deleting projects.
It communicates directly with the Knoa API, taking care of deserializing JSON responses received from Knora and serializing payloads submitted in requests to JSON. 

#### Permissions

The `ProjectsEndpoint` deals with all requests related to reading permissions.
It communicates directly with the Knoa API, taking care of deserializing JSON responses received from Knora. 

### Knora Api v2 Endpoints

The Knora API v2 is used to create, read, search, and modify data (resources and values).
The Knora API relies on JSON-LD as an exchange format.

#### Authentication

The `AuthenticationEndpoint` performs login and logout operations to the Knora API. 
When a user logs in, a token is set and submitted which each request to the Knora API until the user logs out.

#### Ontology

The `OntologiesEndpoint` handles requests to the Knora API that relate to ontologies.

Entire system or project ontologies are requested from Knora 
and converted to a `ReadOntology` using `OntologyConversionUtil`.
`OntologiesEndpoint` should not be used directly by the client when reading ontologies. Instead, `OntologyCache` should be used.
This guarantees that an ontology is only requested once from Knora, keeping API calls and conversions to a minimum.  

#### Resource

The `ResourcesEndpoint` handles requests to the Knora API that relate to resource instances.
When reading resources, resource instances are returned from Knora as JSON-LD and converted to an array of `ReadResource` using `ResourcesConversionUtil`.

### Values

The `ValuesEndpoint` handles requests to the Knora API that relate to operations on values.
When reading values, these are embedded in resource instances and converted to an array of `ReadResource` using `ResourcesConversionUtil`.

#### Search

The `SearchEndpoint` handles requests to the Knora API that relate to searches, either full-text or complex (Gravsearch). 
The result of a search is converted to an array of `ReadResource` or a  `CountQueryResponse` using `ResourcesConversionUtil`.

#### List

`ListsEndpoint` handles requests relating to whole lists or specific list nodes. 
Lists and list nodes serialized as JSON-LD are converted to `ListNode`.
When reading lists or list nodes, `ListsEndpoint` should not be used directly by the client. 
Instead, `ListNodeCache` should be used, keeping API calls and conversions to a minimum.

### Utility Methods

Utility methods perform conversion tasks that need to be performed when deserializing JSON-LD. Utility methods are called in endpoints when an answer from Knora has to be processed. Several endpoints may use the same utility functions. For example, the resources and search endpoint receive the same response format from Knora.

#### Ontology Conversion Util

`OntologyConversionUtil` converts an entire system or project ontology to a `ReadOntology` and also analyzes direct dependencies on other ontologies. Entity definitions contained in an ontology are grouped (resource class definition, standoff class definition, resource property definition, system property definition) and converted from JSON-LD to the corresponding classes.

#### Resource Conversion Util

`ResourcesConversionUtil` handles the conversion of one or several resources serialized as JSON-LD to an array of `ReadResource`. 
`ResourcesConversionUtil` creates an array of `ReadResource` from JSON-LD representing resource instances, 
automatically adding ontology information such as resource class labels and labels from list nodes that are referred to from list values.
It does so by using `OntologyCache` and `ListNodeCache`, minimizing the requests to the Knora API to obtain the necessary information.

`ResourcesConversionUtil.createReadResourceSequence` is a public method that takes JSON-LD representing zero, one or more resources and returns an array of `ReadResource`. For each resource serialized as JSON-LD, `ResourcesConversionUtil.createReadResource` is called to do the conversion to a `ReadResource`. As a first step, `ResourcesConversionUtil.createReadResource` determines the resource's type (its class). Then, the definition for this class is requested from `OntologyCache`. The class definition contains information such as the class's label, cardinalities for properties and the definitions of those properties. The cardinalities are required to distinguish between system properties and properties that are defined in a project ontology. Each property value serialized as JSON-LD is converted to a `ReadValue` if there exists a cardinality for it for the resource class at hand.

Once all property values have been converted, link property values are analyzed to facilitate the handling of incoming and outgoing links on a given resource.

## Caching

Caching is necessary to avoid making redundant calls to the Knora API and processing the same responses more than once.

### Generic Cache

`GenericCache` is an abstract and generic class. The generic type is the type of object that is going to be cached, e.g., an `ReadOntology`. The key is the IRI of the object that is cached. `GenericCache` ensures that a specific element is only requested once from Knora also if several asynchronous for the same element are performed. `GenericCache` also resolves dependencies of an element that is being requested, but in a non blocking ay, i.e. the requested element is returned immediately it is ready while the dependencies are still being resolved.

`GenericCache` cannot be instantiated because it is an abstract class. It can be implemented for a specific type providing implementations for the following methods:

- `requestItemFromKnora(key: string, isDependency: boolean): : Observable<T[]>`: Requests the specified element from Knora, e.g., an ontology by calling the `OntologyEndpoint`.
- `getKeyOfItem(item: T): string`: Given the element, get the key that identifies it. For example given a `ReadOntology` returns its IRI.
- `getDependenciesOfItem(item: T): string[]`: Given an element, gets its dependencies. For example given a `ReadOntology` returns the IRIs of ontologies it directly depends on.

### Ontology Cache

`OntologyCache` is an implementation of `GenericCache` for `ReadOntology`. `OntologyCache` does not only handle the caching of single ontologies but also has a method that combines information from different ontologies, e.g., a resource class definition that has cardinalities for properties form other ontologies.

### List Node Cache

`ListNodeCache` caches list nodes. As an optimization, the entire list is regarded as a dependency of any given list node and requested. Like this, all list nodes can be fetched with one request and written to the cache.
