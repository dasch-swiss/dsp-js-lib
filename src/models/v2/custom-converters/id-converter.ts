import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { CustomConverterUtils } from "./utils";

@JsonConverter
export class IdConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let id = "";

        // TODO: check if it could be an array, too.
        if (item.hasOwnProperty("@id") && CustomConverterUtils.isString(item["@id"])) {
            id = item["@id"];
        }

        return id;
    }
}
