import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

/**
 * @category Model V2
 */
export interface IUrl {
    type?: string;
    value?: string;
    name?: string;
    url?: string;
}

/**
 * @category Internal
 */
@JsonConverter
export abstract class BaseUrlConverter implements JsonCustomConvert<IUrl> {

    serialize(val: IUrl): object {
        return {
            "@type": val.type,
            [Constants.SchemaUrlValue]: val.value
        };
    }

    deserialize(val: any): IUrl {
        return val;
    }
}
