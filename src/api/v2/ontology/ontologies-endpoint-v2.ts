import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { IStringLiteral } from "../../../interfaces/models/v2/i-string-literal";
import { StringLiteral } from "../../../models/admin/string-literal";
import { ApiResponseError } from "../../../models/api-response-error";
import { Constants } from "../../../models/v2/Constants";
import { CreateOntology } from "../../../models/v2/ontologies/create/create-ontology";
import { CreateOntologyResponse } from "../../../models/v2/ontologies/create/create-ontology-response";
import { CreateResourceClass } from "../../../models/v2/ontologies/create/create-resource-class";
import { CreateResourceProperty } from "../../../models/v2/ontologies/create/create-resource-property";
import { OntologiesMetadata } from "../../../models/v2/ontologies/ontology-metadata";
import { OntologyConversionUtil } from "../../../models/v2/ontologies/OntologyConversionUtil";
import { ReadOntology } from "../../../models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../../../models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../../../models/v2/ontologies/resource-property-definition";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the ontologies route of the Knora API.
 */
export class OntologiesEndpointV2 extends Endpoint {

    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------

    /**
     * Requests metadata about all ontologies from Knora.
     */
    getOntologiesMetadata(): Observable<OntologiesMetadata | ApiResponseError> {

        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/metadata").pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return this.jsonConvert.deserializeObject(jsonldobj, OntologiesMetadata);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Requests an ontology from Knora and converts it to a `ReadOntology`.
     *
     * @param ontologyIri the IRI of the ontology to be requested.
     * @return the ontology or an error.
     */
    getOntology(ontologyIri: string): Observable<ReadOntology | ApiResponseError> {

        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/allentities/" + encodeURIComponent(ontologyIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return OntologyConversionUtil.convertOntology(jsonldobj, this.jsonConvert, this.knoraApiConfig);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Requests metadata about all ontologies from specific project
     *
     * @param projectIri the IRI of the project
     */
    getOntologiesByProjectIri(projectIri: string): Observable<OntologiesMetadata | ApiResponseError> {

        return this.httpGet("/metadata/" + encodeURIComponent(projectIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return this.jsonConvert.deserializeObject(jsonldobj, OntologiesMetadata);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------

    createOntology(ontologyData: CreateOntology): Observable<CreateOntologyResponse | ApiResponseError> {

        const onto = this.jsonConvert.serializeObject(ontologyData);

        return this.httpPost("", onto).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, CreateOntologyResponse);
            }),
            catchError(error => this.handleError(error))
        );
    }

    createResourceClass(ontologyIri: string, lastModificationDate: string, resclassData: CreateResourceClass): Observable<ResourceClassDefinition | ApiResponseError> {
        // convert labels and comments from json to json-ld
        const labels: IStringLiteral[] = this.convertStringLiteral2JsonLd(resclassData.labels);
        const comments: IStringLiteral[] = this.convertStringLiteral2JsonLd(resclassData.comments);

        // get name from ontology to use it in the json-ld context
        const ontoName = this.getOntologyName(ontologyIri);

        const resourceClass = {
            "@id": ontologyIri,
            "@type": "owl:Ontology",
            "knora-api:lastModificationDate": {
                "@type": Constants.dateTimeStamp,
                "@value": lastModificationDate
            },
            "@graph": [{
                "@id": ontoName + ":" + resclassData.name,
                "@type": "owl:Class",
                "rdfs:label": labels,
                "rdfs:comment": comments,
                "rdfs:subClassOf": {
                    "@id": resclassData.subClassOf
                }
            }],
            "@context": {
                "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "knora-api": "http://api.knora.org/ontology/knora-api/v2#",
                "owl": "http://www.w3.org/2002/07/owl#",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                [ontoName]: ontologyIri + "#"
            }
        };

        return this.httpPost("/classes", resourceClass).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, ResourceClassDefinition);
            }),
            catchError(error => this.handleError(error))
        );
    }

    createResourceProperty(ontologyIri: string, lastModificationDate: string, classIri: string, respropData: CreateResourceProperty): Observable<ResourcePropertyDefinition | ApiResponseError> {

        // get name from ontology to use it in the json-ld context
        const ontoName = this.getOntologyName(ontologyIri);

        const property = {
            "@id": ontologyIri,
            "@type": "owl:Ontology",
            "knora-api:lastModificationDate": {
                "@type": Constants.dateTimeStamp,
                "@value": lastModificationDate
            },
            "@graph": [
                {
                    // [ontoName + ':' + propName]: {
                    "@id": ontoName + ":" + respropData.name,
                    "@type": "owl:ObjectProperty",
                    "rdfs:label": respropData.label,
                    "rdfs:comment": (respropData.comment ? respropData.comment : respropData.label),
                    "knora-api:objectType": {
                        "@id": respropData.subPropOf
                    },
                    "knora-api:subjectType": {
                        "@id": classIri
                    },
                    "rdfs:subPropertyOf": {
                        "@id": "knora-api:hasValue"     // can be knora-api:hasValue, knora-api:hasLinkTo, or any of their subproperties, with the exception of file properties
                    },
                    "salsah-gui:guiElement": {
                        "@id": respropData.guiElement
                    }
                    // 'salsah-gui:guiAttribute': data.guiAttributes
                    // 'salsah-gui:guiOrder': prop.guiOrder     --> part of owl:Restriction
                    // }
                }
            ],
            "@context": {
                "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "knora-api": "http://api.knora.org/ontology/knora-api/v2#",
                "salsah-gui": "http://api.knora.org/ontology/salsah-gui/v2#",
                "owl": "http://www.w3.org/2002/07/owl#",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                [ontoName]: ontologyIri + "#"
            }
        };

        return this.httpPost("/properties", property).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, ResourcePropertyDefinition);
            }),
            catchError(error => this.handleError(error))
        );
    }

    /**
     * Get the ontolgoy name from ontology iri
     *
     * @param  {string} iri
     * @returns string
     */
    private getOntologyName(iri: string): string {

        const array = iri.split("/");

        const pos = array.length - 2;

        return array[pos].toLowerCase();
    }

    /**
     * Convert an array of type StringLiteral into array of type StringLiteralJsonLd
     *
     * @param  {StringLiteral[]} sl
     * @returns StringLiteralJsonLd[]
     */
    private convertStringLiteral2JsonLd(sl: StringLiteral[]): IStringLiteral[] {
        // in: [{'language': 'en', 'value': 'Value in english'}]

        const slJld: IStringLiteral[] = [];

        for (const obj of sl) {
            const tmpSlJld: IStringLiteral = {
                "@language": (obj.language ? obj.language : ""),
                "@value": obj.value
            };

            slJld.push(tmpSlJld);
        }

        // out: [{'@language': 'en', '@value': 'Description'}, {'@language': 'de', '@value': 'Description'}] OR {'@language': 'en', '@value': 'Description'}
        return slJld;
    }
}
