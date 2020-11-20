import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class UrlToStringConverter implements JsonCustomConvert<string> {

    serialize(val: string | object): any {
        return;
    }

    deserialize(val: any): string {
        if (val.hasOwnProperty("@type") && (val["@type"] === Constants.urlType || val["@type"] === Constants.dataDownload)) {
            return val[Constants.urlType.toLocaleLowerCase()];
        } else {
            return val;
        }
    }
}
