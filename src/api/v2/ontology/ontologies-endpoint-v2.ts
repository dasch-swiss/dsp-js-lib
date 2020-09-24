import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../../models/api-response-error";
import { Constants } from "../../../models/v2/Constants";
import { AddCardinalityToResourceClass } from "../../../models/v2/ontologies/create/add-cardinality-to-resource-class";
import { CreateOntology } from "../../../models/v2/ontologies/create/create-ontology";
import { CreateResourceClass } from "../../../models/v2/ontologies/create/create-resource-class";
import {
    CreateResourceClassPayload,
    NewResourceClass
} from "../../../models/v2/ontologies/create/create-resource-class-payload";
import { CreateResourceProperty } from "../../../models/v2/ontologies/create/create-resource-property";
import {
    CreateResourcePropertyPayload,
    NewResourcePropertyPayload
} from "../../../models/v2/ontologies/create/create-resource-property-payload";
import { DeleteOntology } from "../../../models/v2/ontologies/delete/delete-ontology";
import { DeleteOntologyResponse } from "../../../models/v2/ontologies/delete/delete-ontology-response";
import { OntologiesMetadata, OntologyMetadata } from "../../../models/v2/ontologies/ontology-metadata";
import { OntologyConversionUtil } from "../../../models/v2/ontologies/OntologyConversionUtil";
import { ReadOntology } from "../../../models/v2/ontologies/read/read-ontology";
import { ResourceClassDefinitionWithAllLanguages } from "../../../models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinitionWithAllLanguages } from "../../../models/v2/ontologies/resource-property-definition";
import { UpdateOntology } from "../../../models/v2/ontologies/update/update-ontology";
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
     * Requests an ontology from Knora.
     *
     * @param ontologyIri the IRI of the ontology to be requested.
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
     * Requests metadata about all ontologies from a specific project.
     *
     * @param projectIri the IRI of the project.
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
    deleteOntology(ontology: DeleteOntology): Observable<DeleteOntologyResponse | ApiResponseError> {

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
     * Creates a resource class without cardinalities.
     *
     * @param  resClass The resource class to be created.
     */
    createResourceClass(resClass: UpdateOntology<CreateResourceClass>): Observable<ResourceClassDefinitionWithAllLanguages | ApiResponseError> {

        const resClassPayload = new CreateResourceClassPayload();

        // prepare ontology data for payload
        resClassPayload.id = resClass.id;
        resClassPayload.lastModificationDate = resClass.lastModificationDate;

        // prepare new res class object for payload
        const newResClass = new NewResourceClass();
        newResClass.id = resClass.id + Constants.Delimiter + resClass.entity.name;
        newResClass.label = resClass.entity.labels;
        newResClass.comment = (resClass.entity.comments.length ? resClass.entity.comments : resClass.entity.labels);
        newResClass.subClassOf = resClass.entity.subClassOf;
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
     * Deletes a resource class
     *
     * @param  updateOntology with class IRI.
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
     * Creates a resource property
     *
     * @param  resProp the resource property to be created.
     */
    createResourceProperty(resProp: UpdateOntology<CreateResourceProperty>): Observable<ResourcePropertyDefinitionWithAllLanguages | ApiResponseError> {

        const resPropPayload = new CreateResourcePropertyPayload();

        // prepare ontology data for payload
        resPropPayload.id = resProp.id;
        resPropPayload.lastModificationDate = resProp.lastModificationDate;

        // prepare new res class object for payload
        const newResProperty = new NewResourcePropertyPayload();

        newResProperty.id = resProp.id + Constants.Delimiter + resProp.entity.name;

        newResProperty.label = resProp.entity.labels;
        newResProperty.comment = (resProp.entity.comments.length ? resProp.entity.comments : resProp.entity.labels);
        newResProperty.subPropertyOf = resProp.entity.subPropertyOf;
        newResProperty.type = Constants.ObjectProperty;

        newResProperty.subjectType = resProp.entity.subjectType;
        newResProperty.objectType = resProp.entity.objectType;

        if (resProp.entity.guiElement) {
            newResProperty.guiElement = resProp.entity.guiElement;
        }
        if (resProp.entity.guiAttributes) {
            newResProperty.guiAttributes = resProp.entity.guiAttributes;
        }

        resPropPayload.resProperty = [newResProperty];

        const payload = this.jsonConvert.serializeObject(resPropPayload);

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
     * Deletes a resource property.
     *
     * @param  updateOntology with property IRI.
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

    /**
     * Adds cardinalities for properties to a resource class.
     *
     * @param addCardinalityToResourceClass the cardinailities to be added.
     */
    addCardinalityToResourceClass(addCardinalityToResourceClass: AddCardinalityToResourceClass): Observable<ResourceClassDefinitionWithAllLanguages | ApiResponseError> {

        return this.httpPost("/cardinalities", this.jsonConvert.serializeObject(addCardinalityToResourceClass)).pipe(
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

}
