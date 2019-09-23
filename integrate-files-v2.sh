#!/usr/bin/env bash
set -e

usage() {
  echo "Usage: $0 <Knora-base-dir>" 1>&2;
  echo "Run this script from project root: ./integrate-files-v2.sh"
  exit 1;
  }

if [ $# -eq 1 ] && [ -d $1 ]
then
  cp $1/webapi/src/test/resources/test-data/ontologyR2RV2/knoraApiOntologyWithValueObjects.jsonld ./test/data/api/v2/ontologies/knora-api-ontology.json

else
  usage
fi