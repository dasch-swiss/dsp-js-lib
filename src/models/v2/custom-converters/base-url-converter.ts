import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { IUrl } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";

/**
 * @category Internal
 */
@JsonConverter
export abstract class BaseUrlConverter implements JsonCustomConvert<IUrl | string | Array<IUrl | string>> {

    serialize(el: IUrl | string | Array<IUrl | string>): any {
        if (Array.isArray(el)) {
            const newArr = [] as any[];
            el.forEach(
                (item: IUrl | string) => newArr.push(this.serializeElement(item))
            );
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
                [Constants.SchemaUrlValue]: el.url
            };
        }
    }
}
