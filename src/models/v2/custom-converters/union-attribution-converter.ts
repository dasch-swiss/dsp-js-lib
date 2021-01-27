import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Attribution } from "../project-metadata/attribution";

/**
 * @category Internal
 */
@JsonConverter
export class UnionAttributionConverter implements JsonCustomConvert<Attribution[] | Attribution> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );
    
    serialize(item: Attribution[] | Attribution): any {
        if (Array.isArray(item)) {
            return UnionAttributionConverter.jsonConvert.serializeArray(item, Attribution);
        } else {
            return UnionAttributionConverter.jsonConvert.serializeObject(item, Attribution);
        }
    }

    deserialize(item: any ): Attribution[] | Attribution {
        
        if (Array.isArray(item)) {
            return UnionAttributionConverter.jsonConvert.deserializeArray(item, Attribution);
        } else {
            return [UnionAttributionConverter.jsonConvert.deserializeObject(item, Attribution)];
        }
    }
}
