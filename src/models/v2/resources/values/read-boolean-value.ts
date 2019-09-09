import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { ReadValue } from "./read-value";

@JsonObject("ReadBooleanValue")
export class ReadBooleanValue extends ReadValue {

    @JsonProperty(Constants.BooleanValueAsBoolean, Boolean)
    bool: boolean = false;
}
