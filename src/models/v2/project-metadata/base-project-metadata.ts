import { JsonObject, JsonProperty } from "json2typescript";

/** 
 * @category Model V2 
 */ 
@JsonObject("BaseProjectMetadata")
export abstract class BaseProjectMetadata {

    @JsonProperty("@type", String)
    type: string = "";

    constructor(type: string) {
        this.type = type;
    }
}
