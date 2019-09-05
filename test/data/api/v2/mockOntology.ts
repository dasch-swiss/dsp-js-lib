import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { ReadOntology } from "../../../../src/models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../../../../src/models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../../../../src/models/v2/ontologies/resource-property-definition";
import { StandoffClassDefinition } from "../../../../src/models/v2/ontologies/standoff-class-definition";
import { SystemPropertyDefinition } from "../../../../src/models/v2/ontologies/system-property-definition";
import { OntologyConversionUtils } from "../../../../src/models/v2/OntologyConversionUtil";
import anythingOntologyExpanded from "../v2/ontologies/anything-ontology-expanded.json";
import knoraApiOntologyExpanded from "../v2/ontologies/knora-api-ontology-expanded.json";

export namespace MockOntology {

    export const mockReadOntology = (ontoIri: string): ReadOntology => {

        const jsonConvert: JsonConvert = new JsonConvert(
            OperationMode.ENABLE,
            ValueCheckingMode.DISALLOW_NULL,
            false,
            PropertyMatchingRule.CASE_STRICT
        );

        let ontologyJsonld: any;

        if (ontoIri === "http://api.knora.org/ontology/knora-api/v2") {
            ontologyJsonld = knoraApiOntologyExpanded;
        } else if (ontoIri === "http://api.dasch.swiss/ontology/0001/anything/v2") {
            ontologyJsonld = anythingOntologyExpanded;
        } else {
            throw new Error("Ontology not supported: " + ontoIri);
        }

        const onto = jsonConvert.deserializeObject(ontologyJsonld, ReadOntology);

        const entities: object[] = (ontologyJsonld as { [index: string]: object[] })["@graph"];

        // Convert resource classes
        entities.filter(OntologyConversionUtils.filterResourceClassDefinitions).map(resclassJsonld => {
            return OntologyConversionUtils.convertEntity(resclassJsonld, ResourceClassDefinition, jsonConvert);
        }).forEach((resClass: ResourceClassDefinition) => {
            onto.classes[resClass.id] = resClass;
        });

        // Convert standoff classes
        entities.filter(OntologyConversionUtils.filterStandoffClassDefinitions).map(standoffclassJsonld => {
            return OntologyConversionUtils.convertEntity(standoffclassJsonld, StandoffClassDefinition, jsonConvert);
        }).forEach((standoffClass: StandoffClassDefinition) => {
            onto.classes[standoffClass.id] = standoffClass;
        });

        // Convert resource properties (properties pointing to Knora values)
        entities.filter(OntologyConversionUtils.filterResourcePropertyDefinitions).map(propertyJsonld => {
            return OntologyConversionUtils.convertEntity(propertyJsonld, ResourcePropertyDefinition, jsonConvert);
        }).forEach((prop: ResourcePropertyDefinition) => {
            onto.properties[prop.id] = prop;
        });

        // Convert system properties (properties not pointing to Knora values)
        entities.filter(OntologyConversionUtils.filterSystemPropertyDefintions).map(propertyJsonld => {
            return OntologyConversionUtils.convertEntity(propertyJsonld, SystemPropertyDefinition, jsonConvert);
        }).forEach((prop: SystemPropertyDefinition) => {
            onto.properties[prop.id] = prop;
        });

        const referencedOntologies: Set<string> = new Set([]);

        if (ontoIri === "http://api.dasch.swiss/ontology/0001/anything/v2") {
            referencedOntologies.add("http://api.knora.org/ontology/knora-api/v2");
        }

        onto.dependsOnOntologies = referencedOntologies;

        return onto;

    };

}
