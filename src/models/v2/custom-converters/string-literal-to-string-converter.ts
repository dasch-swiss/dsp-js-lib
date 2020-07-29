import { StringLiteralJsonLd } from "../string-literal-json-ld";
import { JsonConverter, JsonCustomConvert, JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";

@JsonConverter
export class StringLiteralToStringConverter implements JsonCustomConvert<string> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );
    
    serialize(item: string): any {
        return;
    }

    deserialize(item: object | object[] ): string {
        
        if (Array.isArray(item) && item.length > 0) {
            const stringLit = item[0];
            return StringLiteralToStringConverter.jsonConvert.deserializeObject(stringLit, StringLiteralJsonLd).value;
        } else {
            return StringLiteralToStringConverter.jsonConvert.deserializeObject(item, StringLiteralJsonLd).value;
        }
    }
}
