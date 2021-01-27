import { JsonObject, JsonProperty } from "json2typescript";

/**
 * @category Internal
 */
@JsonObject("UpdateEntityCommentOrLabel")
export abstract class UpdateEntityCommentOrLabel {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    constructor(type: string) {
        this.type = type;
    }
}
