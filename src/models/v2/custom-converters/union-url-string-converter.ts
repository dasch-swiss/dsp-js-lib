import { JsonConverter } from "json2typescript";
import { Constants } from "../Constants";
import { BaseUrlConverter, IUrl } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class UnionUrlStringConverter extends BaseUrlConverter {

    deserializeElement(el: any): IUrl | string {
        if (typeof el === "string") {
            return el;
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaUrlType) {
            const obj = {} as IUrl;
            obj.type = el["@type"];
            obj.value = el[Constants.SchemaUrlValue];
            return obj;
        } else {
            throw new Error(`Expected object of ${Constants.SchemaUrlType} type or string.`);
        }
    }

    deserialize(el: any): IUrl | IUrl[] | string | string[] {
        if (Array.isArray(el)) {
            const newObj = [] as any[];
            el.forEach(
                (item: IUrl) => newObj.push(this.deserializeElement(item))
            );
            return newObj as IUrl[];
        } else {
            return this.deserializeElement(el);
        }
    }
}
