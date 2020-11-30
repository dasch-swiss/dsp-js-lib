import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IdConverter } from "../../../custom-converters/id-converter";
import { IBaseListValue } from "../type-specific-interfaces/base-list-value";
import { CreateValue } from "./create-value";

/**
 * @category Model
 */
@JsonObject("CreateListValue")
export class CreateListValue extends CreateValue implements IBaseListValue {

    @JsonProperty(Constants.ListValueAsListNode, IdConverter)
    listNode: string = "";

    constructor() {
        super(Constants.ListValue);
    }
}
