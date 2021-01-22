import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Attribution } from "../project-metadata/attribution";

/**
 * Experimental converter to distinguish elements and arrays of these as a first step
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
            switch (true) {
                case el[0] instanceof Attribution:
                    return ElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Attribution);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.serializeArray(el, String);
            }
        } else {
            switch (true) {
                case el instanceof Attribution:
                    return ElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Attribution);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.serializeObject(el, String);
            }
        }
    }

    deserialize(el: any ): any {
        if (Array.isArray(el)) {
            switch (true) {
                case el[0] instanceof Attribution:
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Attribution);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, String);
            }
        } else {
            switch (true) {
                case el instanceof Attribution:
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Attribution);
                case typeof el === "string":
                    return ElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, String);
            }
        }
    }
}
