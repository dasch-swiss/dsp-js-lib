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
export abstract class BaseUrlConverter implements JsonCustomConvert<IUrl | IUrl[] | string | string[]> {

    serializeElement(el: IUrl): object {
        return {
            "@type": el.type,
            [Constants.SchemaUrlValue]: el.value
        };
    }

    serialize(el: IUrl): object | object[] {
        if (Array.isArray(el)) {
            const newObj = [] as any[];
            el.forEach((
                item => newObj.push(this.serializeElement(item))
            ));
            return newObj;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(val: any): IUrl | IUrl[] | string | string[] {
        return val;
    }
}
