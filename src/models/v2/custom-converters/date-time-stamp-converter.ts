import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { CustomConverterUtils } from "../../../util/utils";

@JsonConverter
export class DateTimeStampConverter implements JsonCustomConvert<string> {
    serialize(dateTimeStamp: string): any {
        return {
            "@type": Constants.dateTimeStamp,
            "@value": dateTimeStamp
        };
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
