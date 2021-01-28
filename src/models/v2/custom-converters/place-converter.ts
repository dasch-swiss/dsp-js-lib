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
        // TODO: temp working solution, check how SpatialCoverage should be send like
        // in the model SpatialCoverage is single Place type object, but returned by DSP-API as array of Place objects
        if (val.hasOwnProperty(Constants.SchemaPropID) && val.hasOwnProperty(Constants.SchemaUrlValue)) {
            const name = val[Constants.SchemaPropID][Constants.SchemaPropID];
            const url = val[Constants.SchemaUrlValue][Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else if (!val.hasOwnProperty(Constants.SchemaPropID) && val.hasOwnProperty(Constants.SchemaUrlValue)) {
            const name = val[Constants.SchemaUrlValue][Constants.SchemaPropID][Constants.SchemaPropID];
            const url = val[Constants.SchemaUrlValue][Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else {
            throw new Error(`Deserialization Error - unknown type(s): "${Constants.SchemaUrlType}", "${Constants.SchemaPropID}"`);
        }
    }
}
