# Design Documentation

## Introduction

## Endpoints

### Knora Admin API Endpoints

#### Users

#### Groups

#### Projects

#### Permissions

### Knora Api v2 Endpoints

#### Authentication

The `AuthenticationEndpoint` performs login and logout operations to the Knora API. 
When a user logs in, a token is set and submitted which each request to the Knora API.

#### Ontology

The `OntologiesEndpoint` handles requests to the Knora API that relate to ontologies.

Entire system or project ontologies are requested from Knora 
and converted to a `ReadOntology` using `OntologyConversionUtil`.
`OntologiesEndpoint` should not be used directly by the client when reading ontologies. Instead, `OntologyCache` should be used.
This guarantees that an ontology is only requested once from Knora, keeping API calls and conversions to a minimum.  

#### Resource

The `ResourcesEndpoint` handles requests to the Knora API that relate to resource instances.
When reading resources, resource instances are returned from Knora as JSON-LD and converted to an array of `ReadResource` using `ResourcesConversionUtil`.

#### Search

The `SearchEndpoint` handles requests to the Knora API that relate to searches, either fulltext or complex (Gravsearch). 
The result of a search is converted to an array of `ReadResource` or a  `CountQueryResponse` using `ResourcesConversionUtil`.

#### List

`ListsEndpoint` handles requests relating to whole lists or specific list nodes. 
Lists and list nodes serialized as JSON-LD are converted to `ListNode`.
When reading lists or list nodes, `ListsEndpoint` should not be used directly by the client. 
Instead, `ListNodeCache` should be used, keeping API calls and conversions to a minimum.

### Utility Methods

#### Ontology Conversion Util

#### Resource Conversion Util

`ResourcesConversionUtil` handles the conversion of one or several resources serialized as JSON-LD to an array of `ReadResource`. 
`ResourcesConversionUtil.createReadResourceSequence` creates an array of `ReadResource` from JSON-LD representing resource instances, 
automatically adding ontology information such as resource class labels and labels from list nodes that are referred to from list values.
It does so by using `OntologyCache` and `ListNodeCache`, minimizing the requests to the Knora API to obtain the necessary information.

#### List Conversion Util

## Caching

### Generic Cache

### Ontology Cache

### List Node Cache

