import { JsonObject, JsonProperty } from "json2typescript";
import { MetadataClasses, UnionMetadataConverter } from "../custom-converters/union-metadata-converter";

/** 
 * @category Model V2 
 */ 
@JsonObject("ProjectsMetadata")
export class ProjectsMetadata {

    @JsonProperty("@graph", UnionMetadataConverter)
    projectsMetadata: MetadataClasses[] = [];
}
