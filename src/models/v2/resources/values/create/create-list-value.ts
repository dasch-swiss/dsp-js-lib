import { JsonObject, JsonProperty } from "json2typescript";
import { Constants, CreateValue } from "../../../../..";
import { IdConverter } from "../../../custom-converters/id-converter";
import { IBaseListValue } from "../type-specific-interfaces/base-list-value";

@JsonObject("CreateListValue")
export class CreateListValue extends CreateValue implements IBaseListValue {

    @JsonProperty(Constants.ListValueAsListNode, IdConverter)
    listNode: string = "";

}
