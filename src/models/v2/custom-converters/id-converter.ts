import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { CustomConverterUtils } from "./utils";

@JsonConverter
export class IdConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let id = "";

        if (Array.isArray(item)) throw new Error("Expected a single element");
        
        if (item.hasOwnProperty("@id") && CustomConverterUtils.isString(item["@id"])) {
            id = item["@id"];
        }

        return id;
    }
}
