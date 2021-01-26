import { JsonObject, JsonProperty } from "json2typescript";
import { MetadataConverter } from "../custom-converters/metadata-converter";
import { Dataset } from "./dataset";
import { Person } from "./person";

/** 
 * @category Model V2 
 */ 
@JsonObject("ProjectsMetadata")
export class ProjectsMetadata {

    @JsonProperty("@graph", MetadataConverter)
    projectsMetadata: Array<Dataset | Person> = [];
}
