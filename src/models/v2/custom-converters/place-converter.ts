import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class PlaceConverter implements JsonCustomConvert<IUrl> {

    serialize(val: IUrl): any {
        return {
            "@type": Constants.SchemaPlace,
            [Constants.SchemaUrlValue]: {
                "@type": Constants.SchemaUrlType,
                [Constants.SchemaPropID]: {
                    "@type": Constants.SchemaPropVal,
                    [Constants.SchemaPropID]: val.name
                },
                [Constants.SchemaUrlValue]: val.url
            }
        };
    }

    deserialize(val: any): IUrl {
        // TODO: change it or SpatialCoverage WRITE format (next iteration), so far it's temp working solution
        if (val.hasOwnProperty(Constants.SchemaPropID) && val.hasOwnProperty(Constants.SchemaUrlValue)) {
            const name = val[Constants.SchemaPropID][Constants.SchemaPropID];
            const url = val[Constants.SchemaUrlValue][Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else if (!val.hasOwnProperty(Constants.SchemaPropID) && val.hasOwnProperty(Constants.SchemaUrlValue)) {
            const name = val[Constants.SchemaUrlValue][Constants.SchemaPropID][Constants.SchemaPropID];
            const url = val[Constants.SchemaUrlValue][Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else {
            throw new Error(`Has not ${Constants.SchemaUrlType} type`);
        }
    }
}
