import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../../models/api-response-error";
import { Constants } from "../../../models/v2/Constants";
import { CreateOntology } from "../../../models/v2/ontologies/create/create-ontology";
import { CreateResourceClass } from "../../../models/v2/ontologies/create/create-resource-class";
import { CreateResourceClassPayload, NewResourceClass } from "../../../models/v2/ontologies/create/create-resource-class-payload";
import { DeleteOntologyResponse } from "../../../models/v2/ontologies/delete/delete-ontology-response";
import { OntologiesMetadata, OntologyMetadata } from "../../../models/v2/ontologies/ontology-metadata";
import { OntologyConversionUtil } from "../../../models/v2/ontologies/OntologyConversionUtil";
import { ReadOntology } from "../../../models/v2/ontologies/read/read-ontology";
import { ResourceClassDefinitionWithAllLanguages } from "../../../models/v2/ontologies/resource-class-definition";
import { UpdateOntology } from "../../../models/v2/ontologies/update-ontology";
import { Endpoint } from "../../endpoint";
import { CreateResourceProperty } from "../../../models/v2/ontologies/create/create-resource-property";
import { CreateResourcePropertyPayload, NewResourceProperty } from "../../../models/v2/ontologies/create/create-resource-property-payload";
import { ResourcePropertyDefinitionWithAllLanguages } from "../../../models/v2/ontologies/resource-property-definition";

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

        const resClassPayload = new CreateResourceClassPayload();

        // prepare ontology data for payload
        resClassPayload.id = resClass.ontology.id;
        resClassPayload.lastModificationDate = resClass.ontology.lastModificationDate;

        // prepare new res class object for payload
        const newResClass = new NewResourceClass();
        newResClass.id = resClass.ontology.id + Constants.Delimiter + resClass.name;
        newResClass.label = resClass.labels;
        newResClass.comment = (resClass.comments.length ? resClass.comments : resClass.labels);
        newResClass.subClassOf = resClass.subClassOf;
        newResClass.type = Constants.Class;

        resClassPayload.resClass = [newResClass];

        const payload = this.jsonConvert.serializeObject(resClassPayload);

        return this.httpPost("/classes", payload).pipe(
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

    /**
     * Delete resource class
     *
     * @param  updateOntology with class IRI
     */
    deleteResourceClass(updateOntology: UpdateOntology): Observable<OntologyMetadata | ApiResponseError> {

        const path = "/classes/" + encodeURIComponent(updateOntology.id) + "?lastModificationDate=" + encodeURIComponent(updateOntology.lastModificationDate);

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

    /**
     * Create a resource property
     * 
     * @param  resProp The resource property to be created
     */
    createResourceProperty(resProp: CreateResourceProperty): Observable<ResourcePropertyDefinitionWithAllLanguages | ApiResponseError> {
        
        const resPropPayload = new CreateResourcePropertyPayload();

        // prepare ontology data for payload
        resPropPayload.id = resProp.ontology.id;
        resPropPayload.lastModificationDate = resProp.ontology.lastModificationDate;

        // prepare new res class object for payload
        const newResProperty = new NewResourceProperty();
        newResProperty.id = resProp.ontology.id + Constants.Delimiter + resProp.name;
        newResProperty.label = resProp.labels;
        newResProperty.comment = (resProp.comments.length ? resProp.comments : resProp.labels);
        newResProperty.subPropertyOf = resProp.subPropertyOf;
        newResProperty.type = Constants.ObjectProperty;

        newResProperty.subjectType = resProp.subjectType;
        newResProperty.objectType = resProp.objectType;
        
        if (resProp.guiElement) {
            newResProperty.guiElement = resProp.guiElement;
        }
        if (resProp.guiAttributes) {
            newResProperty.guiAttributes = resProp.guiAttributes;
        }
        
        resPropPayload.resProperty = [newResProperty];

        const payload = this.jsonConvert.serializeObject(resPropPayload);

        console.log('create res prop payload: ', payload);

        return this.httpPost("/properties", payload).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return OntologyConversionUtil.convertResourcePropertyResponse(jsonldobj, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }


    /**
     * Delete resource property
     *
     * @param  updateOntology with property IRI
     */
    deleteResourceProperty(updateOntology: UpdateOntology): Observable<OntologyMetadata | ApiResponseError> {

        const path = "/properties/" + encodeURIComponent(updateOntology.id) + "?lastModificationDate=" + encodeURIComponent(updateOntology.lastModificationDate);

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
