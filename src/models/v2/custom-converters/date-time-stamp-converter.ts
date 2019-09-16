import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { CustomConverterUtils } from "./utils";

@JsonConverter
export class DateTimeStamp implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let dateTimeStamp = "";

        if (Array.isArray(item)) throw new Error("Expected a single element");

        if (!item.hasOwnProperty("@type") || item["@type"] !== Constants.dateTimeStamp) throw new Error("Not of expected type xsd:dateTimeStamp");

        if (item.hasOwnProperty("@value") && CustomConverterUtils.isString(item["@value"])) {
            dateTimeStamp = item["@value"];
        }

        return dateTimeStamp;
    }
}
