import { JsonConvert } from "json2typescript";
import { Dataset } from "../project-metadata/dataset-definition";
import { ProjectsMetadata } from "../project-metadata/project-metadata";

    /**
     * Converts a list of projects or a single project serialized as JSON-LD to an instance of `ProjectsMetadata`
     * 
     * @param projectsJsonLd JSON-LD representing project metadata.
     * @param jsonConvert instance of JsonConvert to use.
     */
export const convertProjectsList = (projectsJsonLd: object, jsonConvert: JsonConvert): ProjectsMetadata => {

        if (projectsJsonLd.hasOwnProperty("@graph")) {
            return jsonConvert.deserializeObject(projectsJsonLd, ProjectsMetadata);
        } else {
            const projects: ProjectsMetadata = new ProjectsMetadata();
            // creates the same structure for single object incoming from API
            if (Object.keys(projectsJsonLd).length > 0) {
                projects.projectsMetadata = [jsonConvert.deserializeObject(projectsJsonLd, Dataset)];
            }
            return projects;
        }
    };
