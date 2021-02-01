import { JsonObject, JsonProperty } from "json2typescript";
import { MetadataClasses, UnionMetadataConverter } from "../custom-converters/union-metadata-converter";
import { Dataset } from "./dataset";
import { Person } from "./person";

/** 
 * @category Model V2 
 */ 
@JsonObject("ProjectsMetadata")
export class ProjectsMetadata {

    @JsonProperty("@graph", UnionMetadataConverter)
    projectsMetadata: Array<MetadataClasses> = [];
}
