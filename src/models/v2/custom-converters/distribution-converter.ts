import { JsonConverter } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../project-metadata/metadata-interfaces";
import { BaseUrlConverter } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class DistributionConverter extends BaseUrlConverter {

    serialize(el: IUrl): object {
        if (el.hasOwnProperty("@type") && el["type"] === Constants.SchemaDownload) {
            return {
                "@type": el.type,
                [Constants.SchemaUrlValue]: el.url
            };
        } else {
            throw new Error(`Serialization error: expected IUrl object type.
                Instead got ${typeof el}.`);
        }
    }

    deserialize(el: any): IUrl {
        if (el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaDownload) {
            const type = el["@type"];
            const url = el[Constants.SchemaUrlValue];
            return { type, url } as IUrl;
        } else {
            throw new Error(`Deserialization Error: expected an object with property @type 
                equals to ${Constants.SchemaDownload}.`);
        }
    }
}
