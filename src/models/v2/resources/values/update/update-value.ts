import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { WriteValue } from "../write-value";

@JsonObject("UpdateValue")
export abstract class UpdateValue extends WriteValue {

    @JsonProperty("@id", String)
    id: string = "";

}
