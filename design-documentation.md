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

#### Ontology

The `OntologiesEndpoint` handles requests to the Knora API that relate to ontologies.

The method `OntologiesEndpoint.getOntology` gets an entire system or project ontology from Knora 
and converts it to a `ReadOntology` using `OntologyConversionUtil`.
`OntologiesEndpoint.getOntology` should not be used directly by the client. Instead, `OntologyCache.getOntology` should be used.
This guarantees that an ontology is only requested once from Knora, keeping API calls and conversions to a minimum.  

#### Resource

The `ResourcesEndpoint` handles requests to the Knora API that relate to resource instances.

The method `ResourcesEndpoint.getResource` gets a resource instance from Knora and converts it to a `ReadResource`.

#### Search

#### List

## Caching

### Generic Cache

### Ontology Cache

### List Node Cache

