import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DecimalConverter } from "../../CustomConverters";
import { ReadValue } from "./read-value";

@JsonObject("ReadDecimalValue")
export class ReadIntervalValue extends ReadValue {

    @JsonProperty(Constants.IntervalValueHasStart, DecimalConverter)
    start: number = 0;

    @JsonProperty(Constants.IntervalValueHasEnd, DecimalConverter)
    end: number = 0;
}