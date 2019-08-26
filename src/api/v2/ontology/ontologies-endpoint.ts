import {Observable} from 'rxjs';
import {AjaxResponse} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiResponseError} from '../../..';
import {ReadOntology} from '../../../models/v2/ontologies/read-ontology';
import {IHasProperty, ResourceClassDefinition, StandoffClassDefinition} from '../../../models/v2/ontologies/class-definition';
import {Endpoint} from '../../endpoint';
import {Constants} from '../../../models/v2/Constants';
import {ResourcePropertyDefinition} from '../../../models/v2/ontologies/resource-property-definition';
import {SystemPropertyDefinition} from '../../../models/v2/ontologies/system-property-definition';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld/dist/jsonld.js');

export class OntologiesEndpoint extends Endpoint {

    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     * External entity Iris are ignored.
     *
     * @param entityIri an entity Iri.
     * @return the ontology IRI as the only entry in an array, otherwise an empty array.
     */
    getOntologyIriFromEntityIri(entityIri: string): string[] {

        const ontologyIri: string[] = [];

        let projectEntityBase = "http://" + this.knoraApiConfig.apiHost;
        if (this.knoraApiConfig.apiPort !== null) {
            projectEntityBase = projectEntityBase + ":" + this.knoraApiConfig.apiPort;
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

    }

    getOntologies(ontologyIris: string[]) {

    }

    getOntology(ontologyIri: string): Observable<ReadOntology | ApiResponseError> {

        // TODO: Do not hard-code the UR and http call params, generate this from Knora
        return this.httpGet('/allentities/' + encodeURIComponent(ontologyIri)).pipe(
                mergeMap((ajaxResponse: AjaxResponse) => {
                    // console.log(JSON.stringify(ajaxResponse.response));
                    // TODO: @rosenth Adapt context object
                    // TODO: adapt getOntologyIriFromEntityIri
                    return jsonld.compact(ajaxResponse.response, {});
                }), map((jsonldobj: object) => {
                    // console.log(JSON.stringify(jsonldobj));
                    return this.convertOntology(jsonldobj, ontologyIri);
                }),
                catchError(error => {
                    console.error(error);
                    return this.handleError(error);
                })
        );
    }

    /**
     * Converts an ontology serialized as JSON-LD to an instance of `OntologyV2`.
     *
     * @param ontologyJsonld ontology as JSON-LD already processed by the jsonld-processor.
     * @param ontologyIri the Iri of the ontology.
     */
    private convertOntology(ontologyJsonld: object, ontologyIri: string): ReadOntology {

        const onto = new ReadOntology(ontologyIri);

        // Access the collection of entities
        const entities = (ontologyJsonld as { [index: string]: object[] })['@graph'];

        // this.jsonConvert.operationMode = OperationMode.LOGGING;

        // Convert resource classes
        entities.filter((entity: any) => {
            return entity.hasOwnProperty(Constants.IsResourceClass) &&
                    entity[Constants.IsResourceClass] === true;
        }).map(resclassJsonld => {
            return this.jsonConvert.deserializeObject(resclassJsonld, ResourceClassDefinition);
        }).forEach((resClass: ResourceClassDefinition) => {
            onto.classes[resClass.id] = resClass;
        });

        // Convert standoff classes
        entities.filter((entity: any) => {
            return entity.hasOwnProperty(Constants.IsStandoffClass) &&
                    entity[Constants.IsStandoffClass] === true;
        }).map((standoffclassJsonld: any) => {
            return this.jsonConvert.deserializeObject(standoffclassJsonld, StandoffClassDefinition);
        }).forEach((standoffClass: StandoffClassDefinition) => {
            onto.classes[standoffClass.id] = standoffClass;
        });

        // Convert resource properties (properties pointing to Knora values)
        entities.filter((entity: any) => {
            return entity.hasOwnProperty(Constants.IsResourceProperty) &&
                    entity[Constants.IsResourceProperty] === true;
        }).map((propertyJsonld: any) => {
            return this.jsonConvert.deserializeObject(propertyJsonld, ResourcePropertyDefinition);
        }).forEach((prop: ResourcePropertyDefinition) => {
            onto.properties[prop.id] = prop;
        });

        // Convert system properties (properties not pointing to Knora values)
        entities.filter((entity: any) => {
            return (entity['@type'] === Constants.DataTypeProperty || entity['@type'] === Constants.ObjectProperty)
                    && !entity.hasOwnProperty(Constants.IsResourceProperty);
        }).map((propertyJsonld: any) => {
            return this.jsonConvert.deserializeObject(propertyJsonld, SystemPropertyDefinition);
        }).forEach((prop: SystemPropertyDefinition) => {
            onto.properties[prop.id] = prop;
        });

        // Ontologies referenced by this ontology
        const referencedOntologies: Set<string> = new Set([]);

        // Collect ontologies referenced by this ontology in resource classes:
        // references to properties (cardinalities) and resource classes (super classes)
        for (const index in onto.classes) {
            if (onto.classes.hasOwnProperty(index)) {
                onto.classes[index].propertiesList.forEach((prop: IHasProperty) => {
                    this.getOntologyIriFromEntityIri(prop.propertyIndex)
                            .forEach(ontoIri => referencedOntologies.add(ontoIri));
                });
                onto.classes[index].subClassOf.forEach((superClass: string) => {
                    this.getOntologyIriFromEntityIri(superClass)
                            .forEach(ontoIri => referencedOntologies.add(ontoIri));
                });
            }
        }

        // Collect ontologies referenced by this ontology in properties:
        // references to other properties (super properties) and resource classes (subject and object types)
        for (const index in onto.properties) {
            if (onto.properties.hasOwnProperty(index)) {
                if (onto.properties[index].objectType !== undefined) {
                    this.getOntologyIriFromEntityIri(onto.properties[index].objectType as string)
                            .forEach(ontoIri => referencedOntologies.add(ontoIri));
                }
                if (onto.properties[index].subjectType !== undefined) {
                    this.getOntologyIriFromEntityIri(onto.properties[index].subjectType as string)
                            .forEach(ontoIri => referencedOntologies.add(ontoIri));
                }
                onto.properties[index].subPropertyOf.forEach((superProperty: string) => {
                    this.getOntologyIriFromEntityIri(superProperty)
                            .forEach(ontoIri => referencedOntologies.add(ontoIri));
                });
            }
        }

        // Remove this ontology from the collection
        referencedOntologies.delete(onto.id);

        onto.dependsOnOntologies = referencedOntologies;

        return onto;
    }
}
