import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class UrlToStringConverter implements JsonCustomConvert<string> {

    serialize(val: string): object {
        // how to serialazze to URL objects or "hasDistibution" - the @type values are different
        const value = Constants.urlType.toLocaleLowerCase();
        return {
            "@type": Constants.urlType,
            value: val
        };
    }

    deserialize(val: any): string {
        if (val.hasOwnProperty("@type") && (val["@type"] === Constants.urlType || val["@type"] === Constants.dataDownload)) {
            return val[Constants.urlType.toLocaleLowerCase()];
        } else {
            return val;
        }
    }
}