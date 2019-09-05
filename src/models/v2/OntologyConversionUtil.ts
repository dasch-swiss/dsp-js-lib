import { JsonConvert } from "json2typescript";
import { KnoraApiConfig } from "../../knora-api-config";
import { Constants } from "./Constants";
import { ReadOntology } from "./ontologies/read-ontology";
import { ResourceClassDefinition } from "./ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "./ontologies/resource-property-definition";
import { StandoffClassDefinition } from "./ontologies/standoff-class-definition";
import { SystemPropertyDefinition } from "./ontologies/system-property-definition";

export namespace OntologyConversionUtils {

    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     * External entity Iris are ignored.
     *
     * @param entityIri an entity Iri.
     * @param knoraApiConfig the Knora api configuration.
     * @return the ontology IRI as the only entry in an array, otherwise an empty array.
     */
    export const getOntologyIriFromEntityIri = (entityIri: string, knoraApiConfig: KnoraApiConfig): string[] => {

        const ontologyIri: string[] = [];

        let projectEntityBase = "http://" + knoraApiConfig.apiHost;
        if (knoraApiConfig.apiPort !== null) {
            projectEntityBase = projectEntityBase + ":" + knoraApiConfig.apiPort;
        }
        projectEntityBase = projectEntityBase + "/ontology/";

        // Check if the given entity Iri belongs to knora-api or a project ontology.
        // Ignore external entity Iris.
        if (entityIri.indexOf(Constants.KnoraApiV2) === 0) {
            ontologyIri.push(Constants.KnoraApiV2);
        } else if (entityIri.indexOf(projectEntityBase) === 0) {

            // split entity Iri on "#"
            const segments: string[] = entityIri.split(Constants.Delimiter);

            if (segments.length === 2) {
                // First segment identifies the project ontology the entity belongs to.
                ontologyIri.push(segments[0]);
            } else {
                console.error(`Error: ${entityIri} is not a valid Knora entity IRI.`);
            }
        }

        return ontologyIri;

    };

    // Given a collection of definitions, filters out resource class definitions
    export const filterResourceClassDefinitions = (entity: { [index: string]: any }): boolean => {
        return entity.hasOwnProperty(Constants.IsResourceClass) &&
            entity[Constants.IsResourceClass] === true;
    };

    // Given a collection of definitions, filters out standoff class definitions
    export const filterStandoffClassDefinitions = (entity: { [index: string]: any }): boolean => {
        return entity.hasOwnProperty(Constants.IsStandoffClass) &&
            entity[Constants.IsStandoffClass] === true;
    };

    // Given a collection of definitions, filters out resource property definitions
    export const filterResourcePropertyDefinitions = (entity: { [index: string]: any }): boolean => {
        return entity.hasOwnProperty(Constants.IsResourceProperty) &&
            entity[Constants.IsResourceProperty] === true;
    };

    // Given a collection of definitions, filters out system property definitions
    export const filterSystemPropertyDefintions = (entity: { [index: string]: any }) => {
        return (entity["@type"] === Constants.DataTypeProperty || entity["@type"] === Constants.ObjectProperty)
            && !entity.hasOwnProperty(Constants.IsResourceProperty);
    };

    // Converts an entity to the given type
    export const convertEntity = <T>(entity: object, dataType: { new(): T }, jsonConvert: JsonConvert): T => {
        return jsonConvert.deserializeObject(entity, dataType);
    };
    
    /**
     * Given an array of entities, converts and adds them to the given ontology.
     *
     * @param ontology the ontology to which the definitions should be added.
     * @param entities the entities to be converted and added.
     * @param jsonConvert instance of JsonConvert to be used.
     */
    export const convertAndAddEntityDefinitions = (ontology: ReadOntology, entities: object[], jsonConvert: JsonConvert) => {

        // Convert resource classes
        entities.filter(filterResourceClassDefinitions).map(resclassJsonld => {
            return convertEntity(resclassJsonld, ResourceClassDefinition, jsonConvert);
        }).forEach((resClass: ResourceClassDefinition) => {
            ontology.classes[resClass.id] = resClass;
        });

        // Convert standoff classes
        entities.filter(filterStandoffClassDefinitions).map(standoffclassJsonld => {
            return convertEntity(standoffclassJsonld, StandoffClassDefinition, jsonConvert);
        }).forEach((standoffClass: StandoffClassDefinition) => {
            ontology.classes[standoffClass.id] = standoffClass;
        });

        // Convert resource properties (properties pointing to Knora values)
        entities.filter(filterResourcePropertyDefinitions).map(propertyJsonld => {
            return convertEntity(propertyJsonld, ResourcePropertyDefinition, jsonConvert);
        }).forEach((prop: ResourcePropertyDefinition) => {
            ontology.properties[prop.id] = prop;
        });

        // Convert system properties (properties not pointing to Knora values)
        entities.filter(filterSystemPropertyDefintions).map(propertyJsonld => {
            return convertEntity(propertyJsonld, SystemPropertyDefinition, jsonConvert);
        }).forEach((prop: SystemPropertyDefinition) => {
            ontology.properties[prop.id] = prop;
        });
    };

}
