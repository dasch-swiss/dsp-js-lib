import { JsonConvert } from "json2typescript";
import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { KnoraApiConfig } from "../../../knora-api-config";
import { ProjectsResponse } from "../../../models/admin/projects-response";
import { ApiResponseError } from "../../../models/api-response-error";
import { convertProjectsList } from "../../../models/v2/custom-converters/project-metadata-converter";
import { Dataset, ProjectsMetadata } from "../../../models/v2/project-metadata/project-metadata";
import { UpdateProjectMetadataResponse } from "../../../models/v2/project-metadata/update-project-metadata";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the metadata route of the Knora API
 */
export class ProjectMetadataEndpointV2 extends Endpoint {

    /**
     * Constructor
     * @param knoraApiConfig
     * @param path
     */
    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {
        super(knoraApiConfig, path);
    }

    /**
     * Reads a project metadata from Knora.
     * @param resourceIri the Iri of the resource the value belongs to.
     */
    getProjectMetadata(resourceIri: string): Observable<ProjectsMetadata | ApiResponseError> {
        return this.httpGet(`/${encodeURIComponent(resourceIri)}`).pipe(
            // expand all Iris
            mergeMap((res: AjaxResponse) => {
                return jsonld.compact(res.response, {});
            }),
            map((obj: object) => {
                // create an instance of ProjectMetadata from JSON-LD
                // return this.jsonConvert.deserializeObject(obj, Dataset);
                return convertProjectsList(obj, this.jsonConvert);
            }),
            catchError(e => {
                return this.handleError(e);
            })
        );
    }

    /**
     * Updates a project metadata from Knora.
     * @param resourceIri the Iri of the resource the value belongs to.
     * @param metadata the data to update.
     */
    updateProjectMetadata(resourceIri: string, metadata: any): Observable<UpdateProjectMetadataResponse | ApiResponseError> {
        return this.httpPut(`/${encodeURIComponent(resourceIri)}`, metadata).pipe(
            mergeMap((res: AjaxResponse) => {
                return jsonld.compact(res.response, {});
            }),
            map(obj => {
                return this.jsonConvert.deserializeObject(obj, UpdateProjectMetadataResponse);
            }),
            catchError(e => this.handleError(e))
        );
    }
}
