import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../../models/api-response-error";
import { Constants } from "../../../models/v2/Constants";
import { CreateOntology } from "../../../models/v2/ontologies/create/create-ontology";
import { CreateResourceClass, CreateResourceClassPayload } from "../../../models/v2/ontologies/create/create-resource-class";
import { DeleteOntologyResponse } from "../../../models/v2/ontologies/delete/delete-ontology-response";
import { OntologiesMetadata, OntologyMetadata } from "../../../models/v2/ontologies/ontology-metadata";
import { OntologyConversionUtil } from "../../../models/v2/ontologies/OntologyConversionUtil";
import { ReadOntology } from "../../../models/v2/ontologies/read/read-ontology";
import { ResourceClassDefinitionWithAllLanguages } from "../../../models/v2/ontologies/resource-class-definition";
import { UpdateOntology } from "../../../models/v2/ontologies/update-ontology";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the ontologies route of the Knora API.
 */
export class OntologiesEndpointV2 extends Endpoint {

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
                return OntologyConversionUtil.convertOntologiesList(jsonldobj, this.jsonConvert);
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
      * Requests metadata about all ontologies from a specific project
      *
      * @param projectIri the IRI of the project
      * @return OntologiesMetadata or an error 
      */
    getOntologiesByProjectIri(projectIri: string): Observable<OntologiesMetadata | ApiResponseError> {

        return this.httpGet("/metadata/" + encodeURIComponent(projectIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return OntologyConversionUtil.convertOntologiesList(jsonldobj, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );

    }

    /**
     * Creates a new ontology.
     * 
     * @param ontology The ontology to be created
     */
    createOntology(ontology: CreateOntology): Observable<OntologyMetadata | ApiResponseError> {

        const onto = this.jsonConvert.serializeObject(ontology);

        return this.httpPost("", onto).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return this.jsonConvert.deserializeObject(jsonldobj, OntologyMetadata);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Deletes an ontology.
     *
     * @param ontology the ontology to be deleted.
     */
    deleteOntology(ontology: UpdateOntology): Observable<DeleteOntologyResponse | ApiResponseError> {

        const path = "/" + encodeURIComponent(ontology.id) + "?lastModificationDate=" + encodeURIComponent(ontology.lastModificationDate);

        return this.httpDelete(path).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, DeleteOntologyResponse);
            }),
            catchError(error => this.handleError(error))
        );

    }
    /**
     * Create a resource class without cardinalities
     * 
     * @param  resClass The resource class to be created
     */
    createResourceClass(resClass: CreateResourceClass): Observable<ResourceClassDefinitionWithAllLanguages | ApiResponseError> {

        const newResClass = new CreateResourceClassPayload();
        newResClass.id = resClass.ontology.id;
        newResClass.lastModificationDate = resClass.ontology.lastModificationDate;
        newResClass.resClass = [{
            id: resClass.ontology.id + Constants.Delimiter + resClass.name,
            label: resClass.labels,
            comment: resClass.comments,
            subClassOf: resClass.subClassOf,
            type: Constants.Class
        }];

        const resClassPayload = this.jsonConvert.serializeObject(newResClass);

        return this.httpPost("/classes", resClassPayload).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return OntologyConversionUtil.convertResourceClassResponse(jsonldobj, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    deleteResourceClass(data: UpdateOntology): Observable<OntologyMetadata | ApiResponseError> {

        const path = "/classes/" + encodeURIComponent(data.id) + "?lastModificationDate=" + encodeURIComponent(data.lastModificationDate);

        return this.httpDelete(path).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, OntologyMetadata);
            }),
            catchError(error => this.handleError(error))
        );

    }

}
