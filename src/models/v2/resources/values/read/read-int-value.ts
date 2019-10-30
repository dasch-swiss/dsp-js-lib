import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseIntValue } from "../base-int-value";
import { ReadValue } from "./read-value";

@JsonObject("ReadIntValue")
export class ReadIntValue extends ReadValue implements IBaseIntValue {

    @JsonProperty(Constants.IntValueAsInt, Number)
    int: number = 0;
}
