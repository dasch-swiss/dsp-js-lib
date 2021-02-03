import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../project-metadata/metadata-interfaces";

/**
 * @category Model V2
 */

/**
 * @category Internal
 */
@JsonConverter
export abstract class BaseUrlConverter implements JsonCustomConvert<IUrl | string | Array<IUrl | string>> {

    serialize(el: IUrl | string | Array<IUrl | string>): any {
        if (Array.isArray(el)) {
            const newArr = [] as any[];
            el.forEach((
                (item: IUrl | string) => newArr.push(this.serializeElement(item))
            ));
            return newArr;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(val: any): IUrl | string | Array<IUrl | string> {
        return val;
    }

    protected serializeElement(el: IUrl | string): object | string {
        if (typeof el === "string") {
            return el;
        } else {
            return {
                "@type": el.type,
                [Constants.SchemaUrlValue]: el.value
            };
        }
    }
}
