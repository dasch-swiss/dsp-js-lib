import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class StringUrlConverter implements JsonCustomConvert<string> {

    serialize(val: string | object): any {
        return;
    }

    deserialize(val: any): string {
        if (val.hasOwnProperty("@type") && val["@type"] === Constants.urlType) {
            return val[val["@type"].toLocaleLowerCase()];
        } else {
            return val;
        }
    }
}
