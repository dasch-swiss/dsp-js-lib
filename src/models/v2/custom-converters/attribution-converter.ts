import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Attribution } from "../project-metadata/attribution";

/**
 * @category Internal
 */
@JsonConverter
export class AttributionConverter implements JsonCustomConvert<Attribution[] | Attribution> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );
    
    serialize(item: Attribution[] | Attribution): any {
        if (Array.isArray(item)) {
            return AttributionConverter.jsonConvert.serializeArray(item, Attribution);
        } else {
            return AttributionConverter.jsonConvert.serializeObject(item, Attribution);
        }
    }

    deserialize(item: any ): Attribution[] | Attribution {
        
        if (Array.isArray(item)) {
            return AttributionConverter.jsonConvert.deserializeArray(item, Attribution);
        } else {
            return [AttributionConverter.jsonConvert.deserializeObject(item, Attribution)];
        }
    }
}
