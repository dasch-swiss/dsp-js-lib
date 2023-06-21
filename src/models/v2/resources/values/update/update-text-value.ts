import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IdConverter } from "../../../custom-converters/id-converter";
import {
    IBaseFormattedTextValue,
    IBaseTextValueAsHtml,
    IBaseTextValueAsString,
    IBaseTextValueAsXml,
    IBaseUnformattedTextValue
} from "../type-specific-interfaces/base-text-value";
import { UpdateValue } from "./update-value";

/**
 * @category Model V2
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
 * @category Model V2
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

/**
 * @category Model V2
 */
@JsonObject("UpdateTextValueAsHtml")
export class UpdateTextValueAsHtml extends UpdateValue implements IBaseTextValueAsHtml {

    @JsonProperty(Constants.TextValueAsHtml, String, true)
    html: string = "";

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    constructor() {
        super(Constants.TextValue);
    }
}

/**
 * @category Model V2
 */
@JsonObject("UpdateUnformattedTextValue")
export class UpdateUnformattedTextValue extends UpdateValue implements IBaseUnformattedTextValue {

    @JsonProperty(Constants.ValueAsString, String)
    text: string = "";

    constructor() {
        super(Constants.UnformattedTextValue);
    }

}

/**
 * @category Model V2
 */
@JsonObject("UpdateFormattedTextValue")
export class UpdateFormattedTextValue extends UpdateValue implements IBaseFormattedTextValue {

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    @JsonProperty(Constants.TextValueHasMapping, IdConverter)
    mapping: string = "";

    constructor() {
        super(Constants.FormattedTextValue);
    }
}
