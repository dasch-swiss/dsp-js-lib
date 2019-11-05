import { JsonObject, JsonProperty } from "json2typescript";
import { Constants, CreateValue } from "../../../../..";
import { IdConverter } from "../../../custom-converters/id-converter";
import { IBaseLinkValue } from "../type-specific-interfaces/base-link-value";

@JsonObject("CreateLinkValue")
export class CreateLinkValue extends CreateValue implements IBaseLinkValue {

    @JsonProperty(Constants.LinkValueHasTargetIri, IdConverter)
    linkedResourceIri: string = "";

    constructor() {
        super(Constants.LinkValue);
    }
}
