import { JsonConverter } from "json2typescript";
import { Constants } from "../Constants";
import { BaseUrlConverter, IUrl } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class UnionUrlStringConverter extends BaseUrlConverter {

    serializeElement(el: IUrl | string): object | string {
        if (typeof el === "string") {
            return el;
        } else if (!(typeof el === "string")) {
            return {
                "@type": Constants.SchemaUrlType,
                [Constants.SchemaPropID]: {
                    "@type": Constants.SchemaPropVal,
                    [Constants.SchemaPropID]: el.type
                },
                [Constants.SchemaUrlValue]: el.value
            };
        } else {
            throw new Error(`Serialization error: expected string or IUrl object type.
                Instead got ${typeof el}.`);
        }
    }

    deserializeElement(el: any): IUrl | string {
        if (typeof el === "string") {
            return el;
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaUrlType) {
            const obj = {} as IUrl;
            obj.type = el["@type"];
            obj.value = el[Constants.SchemaUrlValue];
            return obj;
        } else {
            throw new Error(`Deserialization Error: expected an object with @type property equals 
                to ${Constants.SchemaUrlType} or string.`);
        }
    }

    serialize(el: IUrl | string | Array<IUrl | string>): object | string {
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

    deserialize(el: any): IUrl | string | Array<IUrl | string> {
        if (Array.isArray(el)) {
            const newObj = [] as Array<IUrl | string>;
            el.forEach(
                (item: any) => newObj.push(this.deserializeElement(item))
            );
            return newObj;
        } else {
            return this.deserializeElement(el);
        }
    }
}
