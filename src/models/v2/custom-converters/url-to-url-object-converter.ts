import { JsonConverter } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../project-metadata/metadata-interfaces";
import { BaseUrlConverter } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class UrlToUrlObjectConverter extends BaseUrlConverter {

    deserialize(el: any): IUrl[] {
        const newArr = [] as IUrl[];
        if (Array.isArray(el)) {
            el.forEach(
                (item: any) => newArr.push(this.deserializeElement(item))
            );
            return newArr;
        } else {
            newArr.push(this.deserializeElement(el));
            return newArr;
        }
    }

    private deserializeElement(el: any): IUrl {
        if (el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaUrlType) {
            const obj = {} as IUrl;
            obj.type = el["@type"];
            obj.url = el[Constants.SchemaUrlValue];
            return obj;
        } else {
            throw new Error(`Deserialization Error: expected an object with @type property equals to 
                ${Constants.SchemaUrlType}.`);
        }
    }
}
