import {OperationMode} from "json2typescript";
import {Observable} from 'rxjs';
import {AjaxResponse} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiResponseData, ApiResponseError, LoginResponse} from '../../..';
import {OntologyV2} from '../../../models/v2/ontologies/ontology-v2';
import {
    ClassDefinition,
    IHasProperty,
    ResourceClass,
    StandoffClass
} from '../../../models/v2/ontologies/class-definition';
import {Endpoint} from '../../endpoint';
import {Constants} from '../../../models/v2/Constants';
import {ResourcePropertyClass, SystemPropertyClass} from '../../../models/v2/ontologies/property-class';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld/dist/jsonld.js');

export class OntologiesEndpoint extends Endpoint {

    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     *
     * @param {string} entityIri an entity Iri.
     * @return {string} the ontology IRI
     */
    static getOntologyIriFromEntityIri(entityIri: string) {

        // TODO: this works only for Knora entity Iris
        // TODO: ignore external entity Iris (foaf,dcterms etc.)

        // split class Iri on "#"
        const segments: string[] = entityIri.split(Constants.Delimiter);

        if (segments.length !== 2) console.error(`Error: ${entityIri} is not a valid entity IRI.`);

        return segments[0];

    }

    getOntologies(ontologyIris: string[]) {

    }

    getOntology(ontologyIri: string): Observable<OntologyV2 | ApiResponseError> {

        return this.httpGet('/allentities/' + encodeURIComponent(ontologyIri)).pipe(
                mergeMap((ajaxResponse: AjaxResponse) => {
                    // console.log(JSON.stringify(ajaxResponse.response));
                    return jsonld.compact(ajaxResponse.response, {});
                }), map((jsonldobj: object) => {
                    // console.log(JSON.stringify(jsonldobj));
                    const responseData = this.convertOntology(jsonldobj, ontologyIri);

                    return responseData;
                }),
                catchError(error => {
                    console.error(error);
                    return this.handleError(error);
                })
        );
    }

    private convertOntology(ontologyJsonld: object, ontologyIri: string): OntologyV2 {

        const onto = new OntologyV2(ontologyIri);

        const entities = (ontologyJsonld as {[index: string]: object[]})['@graph'];

        // this.jsonConvert.operationMode = OperationMode.LOGGING;

        entities.filter((entity: any) => {
            return entity.hasOwnProperty(Constants.IsResourceClass) &&
                entity[Constants.IsResourceClass] === true;
        }).map(resclassJsonld => {
            return this.jsonConvert.deserializeObject(resclassJsonld, ResourceClass);
        }).forEach((resClass: ResourceClass) => {
            onto.classes[resClass.id] = resClass;
        });

        entities.filter((entity: any) => {
            return  entity.hasOwnProperty(Constants.IsStandoffClass) &&
                    entity[Constants.IsStandoffClass] === true;
        }).map((standoffclassJsonld: any) => {
            return this.jsonConvert.deserializeObject(standoffclassJsonld, StandoffClass);
        }).forEach((standoffClass: StandoffClass) => {
            onto.classes[standoffClass.id] = standoffClass;
        });

        entities.filter((entity: any) => {
            return entity.hasOwnProperty(Constants.IsResourceProperty) &&
                entity[Constants.IsResourceProperty] === true;
        }).map((propertyJsonld: any) => {
            return this.jsonConvert.deserializeObject(propertyJsonld, ResourcePropertyClass);
        }).forEach((prop: ResourcePropertyClass) => {
            onto.properties[prop.id] = prop;
        });

        entities.filter((entity: any) => {
            return (entity["@type"] === Constants.DataTypeProperty || entity["@type"] === Constants.DataTypeProperty)
                    && !entity.hasOwnProperty(Constants.IsResourceProperty);
        }).map((propertyJsonld: any) => {
            return this.jsonConvert.deserializeObject(propertyJsonld, SystemPropertyClass);
        }).forEach((prop: SystemPropertyClass) => {
            onto.properties[prop.id] = prop;
        });

        const referencedOntologies: Set<string> = new Set([]);

        for (const index in onto.classes) {
            if (onto.classes.hasOwnProperty(index)) {
                onto.classes[index].propertiesList.forEach((prop: IHasProperty) => {
                    referencedOntologies.add(OntologiesEndpoint.getOntologyIriFromEntityIri(prop.propertyIndex));
                });
                onto.classes[index].subClassOf.forEach((superClass: string) => {
                    referencedOntologies.add(OntologiesEndpoint.getOntologyIriFromEntityIri(superClass));
                });
            }
        }

        for (const index in onto.properties) {
            if (onto.properties.hasOwnProperty(index)) {
                if (onto.properties[index].objectType !== undefined) {
                    referencedOntologies.add(OntologiesEndpoint.getOntologyIriFromEntityIri(onto.properties[index].objectType as string));
                }
                if (onto.properties[index].subjectType !== undefined) {
                    referencedOntologies.add(OntologiesEndpoint.getOntologyIriFromEntityIri(onto.properties[index].subjectType as string));
                }
                onto.properties[index].subPropertyOf.forEach((superProperty: string) => {
                    referencedOntologies.add(OntologiesEndpoint.getOntologyIriFromEntityIri(superProperty));
                });
            }
        }

        referencedOntologies.delete(onto.id);

        onto.dependsOnOntologies = referencedOntologies;

        // console.log(JSON.stringify(onto.properties));

        return onto;
    }
}
