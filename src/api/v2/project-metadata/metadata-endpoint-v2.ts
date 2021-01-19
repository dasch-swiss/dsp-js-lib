import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { KnoraApiConfig } from "../../../knora-api-config";
import { ApiResponseError } from "../../../models/api-response-error";
import { MetadataConversionUtil } from "../../../models/v2/project-metadata/metadata-conversion-util";
import { ProjectsMetadata } from "../../../models/v2/project-metadata/project-metadata";
import { UpdateProjectMetadataResponse } from "../../../models/v2/project-metadata/update-project-metadata";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the metadata route of the Knora API.
 * @category Endpoint V2
 */
export class ProjectMetadataEndpointV2 extends Endpoint {

    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {
        super(knoraApiConfig, path);
    }

    /**
     * Reads a project's metadata from Knora.
     * @param resourceIri the Iri of the resource the value belongs to.
     */
    getProjectMetadata(resourceIri: string): Observable<ProjectsMetadata | ApiResponseError> {
        return this.httpGet("/" + encodeURIComponent(resourceIri)).pipe(
            // expand all Iris
            mergeMap((res: AjaxResponse) => {
                return jsonld.compact(res.response, {});
            }),
            map((obj: ProjectsMetadata) => {
                console.log('RAW', obj);
                // create an instance of ProjectMetadata from JSON-LD
                const convertedObj = MetadataConversionUtil.convertProjectsList(obj, this.jsonConvert);
                // no mapping option
                // return MetadataConversionUtil.convertProjectsList(obj, this.jsonConvert);
                // map outer objects to its references inside the Dateset object
                return MetadataConversionUtil.mapReferences(convertedObj);
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
    updateProjectMetadata(resourceIri: string, metadata: ProjectsMetadata): Observable<UpdateProjectMetadataResponse | ApiResponseError> {
        const convertedMetadata = this.jsonConvert.serializeObject(metadata);
        return this.httpPut("/" + encodeURIComponent(resourceIri), convertedMetadata).pipe(
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
