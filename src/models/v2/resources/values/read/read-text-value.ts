import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IdConverter } from "../../../custom-converters/id-converter";
import {
    IBaseFormattedTextValue,
    IBaseUnformattedTextValue,
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
