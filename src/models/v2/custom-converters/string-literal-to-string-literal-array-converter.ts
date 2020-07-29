import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { StringLiteralJsonLd } from "../string-literal-json-ld";

@JsonConverter
export class StringLiteralToStringLiteralArrayConverter implements JsonCustomConvert<StringLiteralJsonLd[]> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );
    
    serialize(stringLiteral: StringLiteralJsonLd[]): any {
        return;
    }

    deserialize(item: object | object[] ): StringLiteralJsonLd[] {
        
        if (Array.isArray(item)) {
            return StringLiteralToStringLiteralArrayConverter.jsonConvert.deserializeArray(item, StringLiteralJsonLd);
        } else {
            return [StringLiteralToStringLiteralArrayConverter.jsonConvert.deserializeObject(item, StringLiteralJsonLd)];
        }
    }
}
