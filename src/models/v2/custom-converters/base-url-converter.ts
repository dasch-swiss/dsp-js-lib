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
export abstract class BaseUrlConverter implements JsonCustomConvert<IUrl | string | Array<IUrl | string>> {

    serializeElement(el: IUrl | string): object | string {
        if (typeof el === "string") {
            return el;
        } else {
            return {
                "@type": el.type,
                [Constants.SchemaUrlValue]: el.value
            };
        }
    }

    serialize(el: IUrl | string | Array<IUrl | string>): any {
        if (Array.isArray(el)) {
            const newObj = [] as any[];
            el.forEach((
                (item: IUrl | string) => newObj.push(this.serializeElement(item))
            ));
            return newObj;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(val: any): IUrl | string | Array<IUrl | string> {
        return val;
    }
}
