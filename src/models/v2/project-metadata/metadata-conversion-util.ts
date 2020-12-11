import { JsonConvert } from "json2typescript";
import { Constants } from "../Constants";
import { Dataset } from "./dataset-definition";
import { ProjectsMetadata } from "./project-metadata";

export namespace MetadataConversionUtil {
        /**
     * Converts a list of projects or a single project serialized as JSON-LD to an instance of `ProjectsMetadata`
     * @param projectsJsonLd JSON-LD representing project metadata.
     * @param jsonConvert instance of JsonConvert to use.
     */
    export const convertProjectsList = (projectsJsonLd: object, jsonConvert: JsonConvert): ProjectsMetadata => {
        const deserialisedMetadata = jsonConvert.deserializeObject(projectsJsonLd, ProjectsMetadata);
        if (projectsJsonLd.hasOwnProperty("@graph")) {
            return deserialisedMetadata;
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
    export const mapReferences = (data: ProjectsMetadata): ProjectsMetadata => {
        let datasetObj = new Dataset();
        let meta = new ProjectsMetadata();

        data.projectsMetadata.map(obj => {
            if (obj.type === Constants.DspRepoBase + "Dataset") {
                datasetObj = obj as Dataset;
            }
        });

        data.projectsMetadata.map(obj => {
            if (obj.type !== Constants.DspRepoBase + "Dataset") {
                replaceReference(datasetObj, obj.id, obj);
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
    const replaceReference = (obj: object, ref: string, replacer: any): Dataset => {
        let tempObj = Object.assign(obj);

        for (const key in tempObj) {
            if (tempObj[key] === ref) {
                tempObj[key] = replacer;
            } else if (Array.isArray(tempObj[key])) {
                (tempObj[key] as any[]).forEach(member => replaceReference(member, ref, replacer));
            } else if (typeof tempObj[key] === "object") {
                replaceReference(tempObj[key], ref, replacer);
            }
        }
        return tempObj;
    }
}
