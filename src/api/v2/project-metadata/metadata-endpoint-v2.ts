import { JsonConvert } from "json2typescript";
import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { KnoraApiConfig } from "../../../knora-api-config";
import { ApiResponseError } from "../../../models/api-response-error";
import { Constants } from "../../../models/v2/Constants";
import { Dataset } from "../../../models/v2/project-metadata/dataset-definition";
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
                // create an instance of ProjectMetadata from JSON-LD
                const convertedObj = this.convertProjectsList(obj, this.jsonConvert);
                // map outter objects to its references inside the Dateset object
                return this.mapReferences(convertedObj);
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
        const convertedDATA = this.jsonConvert.serializeObject(metadata);
        console.log('METADATA', metadata, convertedDATA);
        return this.httpPut("/" + encodeURIComponent(resourceIri), this.jsonConvert.serializeObject(metadata)).pipe(
            mergeMap((res: AjaxResponse) => {
                return jsonld.compact(res.response, {});
            }),
            map(obj => {
                return this.jsonConvert.deserializeObject(obj, UpdateProjectMetadataResponse);
            }),
            catchError(e => this.handleError(e))
        );
    }

    /**
     * Converts a list of projects or a single project serialized as JSON-LD to an instance of `ProjectsMetadata`
     * @param projectsJsonLd JSON-LD representing project metadata.
     * @param jsonConvert instance of JsonConvert to use.
     */
    private convertProjectsList = (projectsJsonLd: object, jsonConvert: JsonConvert): ProjectsMetadata => {
        const done = jsonConvert.deserializeObject(projectsJsonLd, ProjectsMetadata);
        console.log('converter: ', projectsJsonLd, done);
        if (projectsJsonLd.hasOwnProperty("@graph")) {
            return jsonConvert.deserializeObject(projectsJsonLd, ProjectsMetadata);
        } else {
            const projects: ProjectsMetadata = new ProjectsMetadata();
            // creates the same structure for a single object incoming from the API
            projects.projectsMetadata = [jsonConvert.deserializeObject(projectsJsonLd, Dataset)];
            return projects;
        }
    }
    
    /**
     * Maps over ProjectsMetadata array to return only one item array,
     * which contains Dataset object
     * @param  {ProjectsMetadata} data data to map
     */
    private mapReferences(data: ProjectsMetadata): ProjectsMetadata {
        let datasetObj = new Dataset();
        let meta = new ProjectsMetadata();

        data.projectsMetadata.map(obj => {
            if (obj.type === Constants.DspRepoBase + "Dataset") {
                datasetObj = obj as Dataset;
            }
        });

        data.projectsMetadata.map(obj => {
            if (obj.type !== Constants.DspRepoBase + "Dataset") {
                this.replaceReference(datasetObj, obj.id, obj);
            }
        })

        meta.projectsMetadata.push(datasetObj as Dataset);

        return meta;
    }

    /**
     * Replaces matched references found in Dataset object with outter object
     * @param  {object} obj Dataset object to look in
     * @param  {string} ref reference string to look for
     * @param  {any} replacer item for replacement
     */
    private replaceReference(obj: object, ref: string, replacer: any): Dataset {
        let tempObj = Object.assign(obj);

        for (const key in tempObj) {
            if (tempObj[key] === ref) {
                tempObj[key] = replacer;
            } else if (Array.isArray(tempObj[key])) {
                (tempObj[key] as any[]).forEach(member => this.replaceReference(member, ref, replacer));
            } else if (typeof tempObj[key] === "object") {
                this.replaceReference(tempObj[key], ref, replacer);
            }
        }
        return tempObj;
    }
}
