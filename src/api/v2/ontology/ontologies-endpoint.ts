import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../..";
import { Constants } from "../../../models/v2/Constants";
import { IHasProperty } from "../../../models/v2/ontologies/class-definition";
import { ReadOntology } from "../../../models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../../../models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../../../models/v2/ontologies/resource-property-definition";
import { StandoffClassDefinition } from "../../../models/v2/ontologies/standoff-class-definition";
import { SystemPropertyDefinition } from "../../../models/v2/ontologies/system-property-definition";
import { OntologyConversionUtils } from "../../../models/v2/OntologyConversionUtil";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

export class OntologiesEndpoint extends Endpoint {

    /**
     * Request an ontology from Knora and converts it to a `ReadOntology`.
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
                return this.convertOntology(jsonldobj, ontologyIri);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Converts an ontology serialized as JSON-LD to an instance of `ReadOntology`.
     *
     * @param ontologyJsonld ontology as JSON-LD already processed by the jsonld-processor.
     * @param ontologyIri the Iri of the ontology.
     * @return the ontology as a `ReadOntology`.
     */
    private convertOntology(ontologyJsonld: object, ontologyIri: string): ReadOntology {

        const onto: ReadOntology = this.jsonConvert.deserializeObject(ontologyJsonld, ReadOntology);

        // Access the collection of entities
        const entities: object[] = (ontologyJsonld as { [index: string]: object[] })["@graph"];

        if (!Array.isArray(entities)) throw new Error("An ontology is expected to have a member '@graph' containing an array of entities");

        // this.jsonConvert.operationMode = OperationMode.LOGGING;

        OntologyConversionUtils.convertAndAddEntityDefinitions(onto, entities, this.jsonConvert);

        OntologyConversionUtils.analyzeDirectDependencies(onto, this.knoraApiConfig);

        return onto;
    }
}
