import { JsonObject, JsonProperty } from "json2typescript";
import { Dataset } from "./dataset";
import { Person } from "./person";

/** 
* @category Model V2 
*/ 
@JsonObject("ProjectsMetadata")
export class ProjectsMetadata {

    @JsonProperty("@graph", [Dataset, Person])
    projectsMetadata: Array<Dataset | Person> = [];
}
