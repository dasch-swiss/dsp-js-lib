import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { IResourceClassAndPropertyDefinitions } from "../../../../src/cache/OntologyCache";
import { ReadOntology } from "../../../../src/models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../../../../src/models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../../../../src/models/v2/ontologies/resource-property-definition";
import { StandoffClassDefinition } from "../../../../src/models/v2/ontologies/standoff-class-definition";
import { SystemPropertyDefinition } from "../../../../src/models/v2/ontologies/system-property-definition";
import { OntologyConversionUtil } from "../../../../src/models/v2/ontologies/OntologyConversionUtil";
import anythingOntologyExpanded from "../v2/ontologies/anything-ontology-expanded.json";
import knoraApiOntologyExpanded from "../v2/ontologies/knora-api-ontology-expanded.json";

export namespace MockOntology {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const mockReadOntology = (ontoIri: string): ReadOntology => {

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
        entities.filter(OntologyConversionUtil.filterResourceClassDefinitions).map(resclassJsonld => {
            return OntologyConversionUtil.convertEntity(resclassJsonld, ResourceClassDefinition, jsonConvert);
        }).forEach((resClass: ResourceClassDefinition) => {
            onto.classes[resClass.id] = resClass;
        });

        // Convert standoff classes
        entities.filter(OntologyConversionUtil.filterStandoffClassDefinitions).map(standoffclassJsonld => {
            return OntologyConversionUtil.convertEntity(standoffclassJsonld, StandoffClassDefinition, jsonConvert);
        }).forEach((standoffClass: StandoffClassDefinition) => {
            onto.classes[standoffClass.id] = standoffClass;
        });

        // Convert resource properties (properties pointing to Knora values)
        entities.filter(OntologyConversionUtil.filterResourcePropertyDefinitions).map(propertyJsonld => {
            return OntologyConversionUtil.convertEntity(propertyJsonld, ResourcePropertyDefinition, jsonConvert);
        }).forEach((prop: ResourcePropertyDefinition) => {
            onto.properties[prop.id] = prop;
        });

        // Convert system properties (properties not pointing to Knora values)
        entities.filter(OntologyConversionUtil.filterSystemPropertyDefintions).map(propertyJsonld => {
            return OntologyConversionUtil.convertEntity(propertyJsonld, SystemPropertyDefinition, jsonConvert);
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

    export const mockIResourceClassAndPropertyDefinitions = (resClassIri: string): IResourceClassAndPropertyDefinitions => {

        const entityMock: IResourceClassAndPropertyDefinitions = {
            classes: {},
            properties: {}
        };

        const anythingOntology: any = anythingOntologyExpanded;
        const knoraApiOntology: any = knoraApiOntologyExpanded;

        const knoraApiEntities = (knoraApiOntology as { [index: string]: object[] })["@graph"];
        const anythingEntities = (anythingOntology as { [index: string]: object[] })["@graph"];

        const entities = knoraApiEntities.concat(anythingEntities);

        // Convert resource classes
        entities.filter(OntologyConversionUtil.filterResourceClassDefinitions)
            .map(resclassJsonld => OntologyConversionUtil.convertEntity(resclassJsonld, ResourceClassDefinition, jsonConvert))
            .filter(resclassDef => resclassDef.id === resClassIri)
            .forEach((resClass: ResourceClassDefinition) => {
                entityMock.classes[resClass.id] = resClass;
            });

        // properties of anything Thing
        const props: string[]
            = entityMock.classes[resClassIri].propertiesList.map(prop => prop.propertyIndex);

        // Convert resource properties (properties pointing to Knora values)
        entities.filter(OntologyConversionUtil.filterResourcePropertyDefinitions)
            .map((propertyJsonld: any) => {
                return OntologyConversionUtil.convertEntity(propertyJsonld, ResourcePropertyDefinition, jsonConvert);
            }).filter(propertyDef => props.indexOf(propertyDef.id) !== -1)
            .forEach((prop: ResourcePropertyDefinition) => {
                entityMock.properties[prop.id] = prop;
            });

        // Convert system properties (properties not pointing to Knora values)
        entities.filter(OntologyConversionUtil.filterSystemPropertyDefintions)
            .map((propertyJsonld: any) => {
                return OntologyConversionUtil.convertEntity(propertyJsonld, SystemPropertyDefinition, jsonConvert);
            }).filter(propertyDef => props.indexOf(propertyDef.id) !== -1)
            .forEach((prop: SystemPropertyDefinition) => {
                entityMock.properties[prop.id] = prop;
            });

        return entityMock;

    };

}
