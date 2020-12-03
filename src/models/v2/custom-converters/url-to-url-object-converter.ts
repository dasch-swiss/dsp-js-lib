import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

export interface IUrl {
    type: string;
    value: string;
}

@JsonConverter
export class UrlToUrlObjectConverter implements JsonCustomConvert<IUrl> {

    serialize(val: IUrl): object {
        const obj = {} as { [index: string]: string };
        obj["@type"] = val.type;
        obj[Constants.SchemaUrlValue] = val.value;

        return obj;
    }

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
