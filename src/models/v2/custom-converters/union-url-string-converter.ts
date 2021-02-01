import { JsonConverter } from "json2typescript";
import { Constants } from "../Constants";
import { BaseUrlConverter, IUrl } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class UnionUrlStringConverter extends BaseUrlConverter {

    serialize(el: Array<IUrl | string>): any {
        if (Array.isArray(el)) {
            const newArr = [] as any[];
            el.forEach((
                (item: IUrl | string) => newArr.push(this.serializeElement(item))
            ));
            return newArr;
        }
    }

    deserialize(el: any): Array<IUrl | string> {
        const newArr = [] as Array<IUrl | string>;
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

    protected serializeElement(el: IUrl | string): object | string {
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

    private deserializeElement(el: any): IUrl | string {
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
}
