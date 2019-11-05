import { JsonObject, JsonProperty } from "json2typescript";
import { Constants, CreateValue } from "../../../../..";
import { IdConverter } from "../../../custom-converters/id-converter";
import { IBaseTextValueAsString, IBaseTextValueAsXml } from "../type-specific-interfaces/base-text-value";

@JsonObject("CreateTextValueAsString")
export class CreateTextValueAsString extends CreateValue implements IBaseTextValueAsString {

    @JsonProperty(Constants.ValueAsString, String)
    text: string = "";

    constructor() {
        super(Constants.TextValue);
    }

}

@JsonObject("CreateTextValueAsXml")
export class CreateTextValueAsXml extends CreateValue implements IBaseTextValueAsXml {

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    @JsonProperty(Constants.TextValueHasMapping, IdConverter)
    mapping: string = "";

    constructor() {
        super(Constants.TextValue);
    }

}
