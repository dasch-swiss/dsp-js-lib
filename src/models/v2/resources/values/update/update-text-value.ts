import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IdConverter } from "../../../custom-converters/id-converter";
import { IBaseTextValueAsString, IBaseTextValueAsXml } from "../type-specific-interfaces/base-text-value";
import { UpdateValue } from "./update-value";

/**
 * @category Model
 */
@JsonObject("UpdateTextValueAsString")
export class UpdateTextValueAsString extends UpdateValue implements IBaseTextValueAsString {

    @JsonProperty(Constants.ValueAsString, String)
    text: string = "";

    constructor() {
        super(Constants.TextValue);
    }

}

/**
 * @category Model
 */
@JsonObject("UpdateTextValueAsXml")
export class UpdateTextValueAsXml extends UpdateValue implements IBaseTextValueAsXml {

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    @JsonProperty(Constants.TextValueHasMapping, IdConverter)
    mapping: string = "";

    constructor() {
        super(Constants.TextValue);
    }
}
