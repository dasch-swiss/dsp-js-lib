import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { CustomConverterUtils } from "../../../util/utils";

/**
 * @internal
 */
@JsonConverter
export class IdConverter implements JsonCustomConvert<string> {
    serialize(id: string): any {

        return {
            "@id": id
        };
    }

    deserialize(item: any): string {

        if (Array.isArray(item)) throw new Error("Expected a single element");
        
        if (item.hasOwnProperty("@id") && CustomConverterUtils.isString(item["@id"])) {
            return item["@id"];
        } else {
            throw new Error("Expected @id");
        }

    }
}
