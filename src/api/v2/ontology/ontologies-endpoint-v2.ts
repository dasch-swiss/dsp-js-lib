import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../../models/api-response-error";
import { Constants } from "../../../models/v2/Constants";
import { UpdateOntologyResourceClassCardinality } from "../../../models/v2/ontologies/update/update-ontology-resource-class-cardinality";
import { CreateOntology } from "../../../models/v2/ontologies/create/create-ontology";
import { CreateResourceClass } from "../../../models/v2/ontologies/create/create-resource-class";
import {
    CreateResourceClassPayload
} from "../../../models/v2/ontologies/create/create-resource-class";
import { CreateResourceProperty } from "../../../models/v2/ontologies/create/create-resource-property";
import {
    CreateResourcePropertyPayload,
    NewResourcePropertyPayload
} from "../../../models/v2/ontologies/create/create-resource-property-payload";
import { DeleteOntology } from "../../../models/v2/ontologies/delete/delete-ontology";
import { DeleteOntologyResponse } from "../../../models/v2/ontologies/delete/delete-ontology-response";
import { DeleteResourceClass } from "../../../models/v2/ontologies/delete/delete-resource-class";
import { DeleteResourceProperty } from "../../../models/v2/ontologies/delete/delete-resource-property";
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
     * @param  resourceClasses The resource class to be created.
     */
    createResourceClass(resourceClasses: UpdateOntology<CreateResourceClass>): Observable<ResourceClassDefinitionWithAllLanguages | ApiResponseError> {

        const resClassesPay: CreateResourceClassPayload[] = resourceClasses.entities.map(
            (entity: CreateResourceClass) => {

                const resClassPay = new CreateResourceClassPayload();

                resClassPay.id = resourceClasses.id + Constants.Delimiter + entity.name;
                resClassPay.label = entity.label;
                resClassPay.comment = (entity.comment.length ? entity.comment : entity.label);
                resClassPay.subClassOf = entity.subClassOf;
                resClassPay.type = Constants.Class;

                return resClassPay;

            }
        );

        const ontoPayload = this.jsonConvert.serializeObject(resourceClasses);

        ontoPayload["@graph"] = this.jsonConvert.serializeArray(resClassesPay);

        return this.httpPost("/classes", ontoPayload).pipe(
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
     * Deletes a resource class.
     *
     * @param  deleteResourceClass with class IRI.
     */
    deleteResourceClass(deleteResourceClass: DeleteResourceClass): Observable<OntologyMetadata | ApiResponseError> {

        const path = "/classes/" + encodeURIComponent(deleteResourceClass.id) + "?lastModificationDate=" + encodeURIComponent(deleteResourceClass.lastModificationDate);

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
     * Creates a resource property.
     *
     * @param  resourceProperty the resource property to be created.
     */
    createResourceProperty(resourceProperty: UpdateOntology<CreateResourceProperty>): Observable<ResourcePropertyDefinitionWithAllLanguages | ApiResponseError> {

        const resPropPayload = new CreateResourcePropertyPayload();

        // prepare ontology data for payload
        resPropPayload.id = resourceProperty.id;
        resPropPayload.lastModificationDate = resourceProperty.lastModificationDate;

        // prepare new res class object for payload
        const newResProperty = new NewResourcePropertyPayload();

        newResProperty.id = resourceProperty.id + Constants.Delimiter + resourceProperty.entities[0].name;

        newResProperty.label = resourceProperty.entities[0].labels;
        newResProperty.comment = (resourceProperty.entities[0].comments.length ? resourceProperty.entities[0].comments : resourceProperty.entities[0].labels);
        newResProperty.subPropertyOf = resourceProperty.entities[0].subPropertyOf;
        newResProperty.type = Constants.ObjectProperty;

        newResProperty.subjectType = resourceProperty.entities[0].subjectType;
        newResProperty.objectType = resourceProperty.entities[0].objectType;

        if (resourceProperty.entities[0].guiElement) {
            newResProperty.guiElement = resourceProperty.entities[0].guiElement;
        }
        if (resourceProperty.entities[0].guiAttributes) {
            newResProperty.guiAttributes = resourceProperty.entities[0].guiAttributes;
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
     * @param  deleteResourceProperty with property IRI.
     */
    deleteResourceProperty(deleteResourceProperty: DeleteResourceProperty): Observable<OntologyMetadata | ApiResponseError> {

        const path = "/properties/" + encodeURIComponent(deleteResourceProperty.id) + "?lastModificationDate=" + encodeURIComponent(deleteResourceProperty.lastModificationDate);

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
    addCardinalityToResourceClass(addCardinalityToResourceClass: UpdateOntologyResourceClassCardinality): Observable<ResourceClassDefinitionWithAllLanguages | ApiResponseError> {

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
