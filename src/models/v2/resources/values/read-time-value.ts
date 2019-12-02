import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStamp } from "../../custom-converters/date-time-stamp-converter";
import { ReadValue } from "./read/read-value";

@JsonObject("ReadTimeValue")
export class ReadTimeValue extends ReadValue {

    @JsonProperty(Constants.TimeValueAsTimeStamp, DateTimeStamp)
    time: string = "";
}
