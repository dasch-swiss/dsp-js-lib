import { JsonConverter } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../project-metadata/metadata-interfaces";
import { BaseUrlConverter } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class UnionUrlStringConverter extends BaseUrlConverter {

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
            if (el.hasOwnProperty(Constants.SchemaPropID)) {
                return {
                    "@type": Constants.SchemaUrlType,
                    [Constants.SchemaPropID]: {
                        "@type": Constants.SchemaPropVal,
                        [Constants.SchemaPropID]: el.name
                    },
                    [Constants.SchemaUrlValue]: el.url
                };
            } else {
                return {
                    "@type": el.type,
                    [Constants.SchemaUrlValue]: el.url
                };
            }
        } else {
            throw new Error(`Serialization error: expected string or IUrl object type.
                Instead got ${typeof el}.`);
        }
    }

    private deserializeElement(el: any): IUrl | string {
        if (typeof el === "string") {
            return el;
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaUrlType) {
            const type = el["@type"];
            const url = el[Constants.SchemaUrlValue];
            if (el.hasOwnProperty(Constants.SchemaPropID)) {
                const name = el[Constants.SchemaPropID][Constants.SchemaPropID];
                // const type = el["@type"];
                // const url = el[Constants.SchemaUrlValue];
                return { name, type, url } as IUrl;   
            } else {
                return { type, url } as IUrl;
            }
            // const name = el[Constants.SchemaPropID][Constants.SchemaPropID];
            // const type = el["@type"];
            // const url = el[Constants.SchemaUrlValue];
            // return { name, type, url } as IUrl;
        } else {
            throw new Error(`Deserialization Error: expected an object with @type property equals 
                to ${Constants.SchemaUrlType} or string.`);
        }
    }
}
