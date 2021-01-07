import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { BaseUrlConverter, IUrl } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class DistributionConverter extends BaseUrlConverter {

    deserialize(val: any): IUrl {
        if (val.hasOwnProperty("@type") && val["@type"] === Constants.SchemaDownload) {
            const obj = {} as IUrl;
            obj.type = val["@type"];
            obj.value = val[Constants.SchemaUrlValue];
            return obj;
        } else {
            throw new Error(`Expected object of ${Constants.SchemaDownload} type`);
        }
    }
}
