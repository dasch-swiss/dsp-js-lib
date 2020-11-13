import { JsonLdProcessor } from "jsonld";
import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { map, mergeMap } from "rxjs/operators";
import { KnoraApiConfig } from "../../../knora-api-config";
import { ProjectMetadata } from "../../../models/v2/project-metadata/project-metadata";
import { Endpoint } from "../../endpoint";

// declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
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

    getMetadata(projectIri: string): Observable<ProjectMetadata> {
        return this.httpGet("/" + encodeURIComponent(projectIri)).pipe(
            mergeMap((res: AjaxResponse) => {
                return jsonld.compact(res.response, {});
            }),
            map((obj: object) => {
                return this.jsonConvert.deserializeObject(obj, ProjectMetadata);
            })
        );
    }

    updateMetadata(projectIri: string): Observable<any> {
        const metadata = "";
        return this.httpPut("", metadata);
    }
}
