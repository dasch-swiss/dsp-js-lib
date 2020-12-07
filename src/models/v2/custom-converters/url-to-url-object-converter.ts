import { JsonConverter } from "json2typescript";
import { Constants } from "../Constants";
import { BaseUrlConverter, IUrl } from "./base-url-converter";

@JsonConverter
export class UrlToUrlObjectConverter extends BaseUrlConverter {

    deserialize(val: any): IUrl {
        if (val.hasOwnProperty("@type") && val["@type"] === Constants.SchemaUrlType) {
            const obj = {} as IUrl;
            obj.type = val["@type"];
            obj.value = val[Constants.SchemaUrlValue];
            return obj;
        } else {
            throw new Error(`Expected object of ${Constants.SchemaUrlType} type`);
        }
    }
}
