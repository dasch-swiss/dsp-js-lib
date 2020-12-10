import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class AdvancedUrlObjectConverter implements JsonCustomConvert<IUrl> {

    serialize(val: IUrl): any {
        return {
            "@type": Constants.SchemaUrlType,
            [Constants.SchemaPropID]: {
                "@type": Constants.SchemaPropVal,
                [Constants.SchemaPropID]: val.name
            },
            [Constants.SchemaUrlValue]: val.url
        };
    }

    deserialize(val: any): IUrl {
        if (val.hasOwnProperty(Constants.SchemaPropID)) {
            const name = val[Constants.SchemaPropID][Constants.SchemaPropID];
            const url = val[Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else {
            throw new Error(`Has not ${Constants.SchemaPropID} type`);
        }
    }
}
