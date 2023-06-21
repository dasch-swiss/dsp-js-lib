import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IdConverter } from "../../../custom-converters/id-converter";
import {
    IBaseFormattedTextValue,
    IBaseTextValueAsHtml,
    IBaseTextValueAsString,
    IBaseTextValueAsXml, IBaseUnformattedTextValue
} from "../type-specific-interfaces/base-text-value";
import { ReadValue } from "./read-value";

/**
 * @category Model V2
 */
@JsonObject("ReadTextValue")
export abstract class ReadTextValue extends ReadValue {
}

/**
 * @category Model V2
 */
@JsonObject("ReadTextValueAsString")
export class ReadTextValueAsString extends ReadTextValue implements IBaseTextValueAsString {

    // TODO: query standoff, if any.

    @JsonProperty(Constants.ValueAsString, String)
    text: string = "";

}

/**
 * @category Model V2
 */
@JsonObject("ReadTextValueAsXml")
export class ReadTextValueAsXml extends ReadTextValue implements IBaseTextValueAsXml {

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    @JsonProperty(Constants.TextValueHasMapping, IdConverter)
    mapping: string = "";

}

/**
 * @category Model V2
 */
@JsonObject("ReadTextValueAsHtml")
export class ReadTextValueAsHtml extends ReadTextValue implements IBaseTextValueAsHtml {

    @JsonProperty(Constants.TextValueAsHtml, String)
    html: string = "";

    // set xml value as optional to avoid breaking changes
    @JsonProperty(Constants.TextValueAsXml, String, true)
    xml: string = "";

}

/**
 * @category Model V2
 */
@JsonObject("ReadUnformattedTextValue")
export class ReadUnformattedTextValue extends ReadTextValue implements IBaseUnformattedTextValue {

    // TODO: query standoff, if any.

    @JsonProperty(Constants.ValueAsString, String)
    text: string = "";

}

/**
 * @category Model V2
 */
@JsonObject("ReadFormattedTextValue")
export class ReadFormattedTextValue extends ReadTextValue implements IBaseFormattedTextValue {

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    @JsonProperty(Constants.TextValueHasMapping, IdConverter)
    mapping: string = "";

}
