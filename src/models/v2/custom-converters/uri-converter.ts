import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { CustomConverterUtils } from "../../../util/utils";

@JsonConverter
export class UriConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let uri = "";

        if (Array.isArray(item)) throw new Error("Expected a single element");

        if (!item.hasOwnProperty("@type") || item["@type"] !== Constants.XsdAnyUri) throw new Error("Not of expected type xsd:anyURI");

        if (item.hasOwnProperty("@value") && CustomConverterUtils.isString(item["@value"])) {
            uri = item["@value"];
        }

        return uri;
    }
}
