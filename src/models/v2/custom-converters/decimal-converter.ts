import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { CustomConverterUtils } from "../../../util/utils";

@JsonConverter
export class DecimalConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let decimal = "";

        if (Array.isArray(item)) throw new Error("Expected a single element");

        if (!item.hasOwnProperty("@type") || item["@type"] !== Constants.XsdDecimal) throw new Error("Not of expected type xsd:decimal");

        if (item.hasOwnProperty("@value") && CustomConverterUtils.isString(item["@value"])) {
            decimal = item["@value"];
        }

        return decimal;
    }
}
