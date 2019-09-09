import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { ReadValue } from "./read-value";

@JsonObject("ReadIntValue")
export class ReadIntValue extends ReadValue {

    @JsonProperty(Constants.IntValueAsInt, Number)
    int: number = 0;
}
