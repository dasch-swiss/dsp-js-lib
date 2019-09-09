import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { CustomConverterUtils } from "./utils";

@JsonConverter
export class DecimalConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let decimal = "";

        // TODO: check if it could be an array, too.
        if (item.hasOwnProperty("@value") && CustomConverterUtils.isString(item["@value"])) {
            decimal = item["@value"];
        }

        return decimal;
    }
}
