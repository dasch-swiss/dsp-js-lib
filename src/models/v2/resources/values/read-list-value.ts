import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { IdConverter } from "../../custom-converters/id-converter";
import { ReadValue } from "./read-value";

@JsonObject("ReadListValue")
export class ReadListValue extends ReadValue {

    @JsonProperty(Constants.ListValueAsListNode, IdConverter)
    listNode: string = "";

    listNodeLabel: string;
}
