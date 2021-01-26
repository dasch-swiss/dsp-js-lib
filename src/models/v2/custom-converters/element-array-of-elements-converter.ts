import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Attribution } from "../project-metadata/attribution";
import { Grant } from "../project-metadata/grant";
import { Place } from "../project-metadata/place";

/**
 * Experimental converter to distinguish elements and arrays of these as a first step
 * Attribution and String cases are ready to use but not yet turned on inside classes 
 * @category Internal
 */
@JsonConverter
export class ElementArrayOfElementsConverter implements JsonCustomConvert<any> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );
    
    serialize(el: any): any {
        if (Array.isArray(el)) {
            console.log("ser ARR", el);
            switch (true) {
                case el[0].hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return ElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Attribution);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.DspGrant:
                    return ElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Grant);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.SchemaPlace:
                    return ElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Place);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.serializeArray(el, String);
            }
        } else {
            console.log("ser EL", el);
            switch (true) {
                case el.hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return ElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Attribution);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant:
                    return ElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Grant);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaPlace:
                    return ElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Place);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.serializeObject(el, String);
            }
        }
    }

    deserialize(el: any ): any {
        if (Array.isArray(el)) {
            console.log("deser ARR", el);
            switch (true) {
                case el[0].hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Attribution);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.DspGrant:
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Grant);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.SchemaPlace:
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Place);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, String);
            }
        } else {
            console.log("deser EL", el);
            switch (true) {
                case el.hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Attribution);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant:
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Grant);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaPlace:
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Place);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, String);
            }
        }
    }
}
