import { JsonObject, JsonProperty } from "json2typescript";
import { WriteValue } from "../write-value";

/**
 * @internal
 */
@JsonObject("UpdateValue")
export abstract class UpdateValue extends WriteValue {

    @JsonProperty("@id", String)
    id: string = "";

    constructor(type: string) {
        super();
        this.type = type;
    }

}
