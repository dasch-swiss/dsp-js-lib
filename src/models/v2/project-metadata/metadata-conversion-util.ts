import { JsonConvert } from "json2typescript";
import { Dataset } from "./dataset";
import { Person } from "./person";
import { ProjectsMetadata } from "./project-metadata";

/**
 * @category Internal
 */
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
    };
    
    /**
     * Maps over ProjectsMetadata array to return only one item array,
     * which contains Dataset object
     * @param  {ProjectsMetadata} data data to map
     */
    export const mapReferences = (data: ProjectsMetadata): ProjectsMetadata => {
        const meta = new ProjectsMetadata();

        // handles 1 or more Dataset objects
        const datasets: Dataset[] = data.projectsMetadata.filter(obj => (obj instanceof Dataset)).map(dataset => dataset as Dataset);

        data.projectsMetadata.forEach(obj => {
            if (!(obj instanceof Dataset)) {
                datasets.forEach(
                    dataset => replaceReference(dataset, obj.id, obj)
                );
            }
        });

        meta.projectsMetadata = [...datasets];
        return meta;
    };

    /**
     * Replaces matched references found in Dataset object with outer object
     * @param  {Dataset} obj Dataset object to look in
     * @param  {string} ref reference string to look for
     * @param  {Person} replacer class instance for replacement
     */
    const replaceReference = (obj: Dataset, ref: string, replacer: Person): Dataset => {
        const tempObj = Object.assign(obj);

        // TODO: consider other objects placed outside the Dataset object(s) and/or simplify/adjust it to known possibilities
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
    };
}
