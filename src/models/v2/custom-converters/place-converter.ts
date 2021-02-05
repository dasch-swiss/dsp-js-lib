import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../project-metadata/metadata-interfaces";

/**
 * @category Internal
 */
@JsonConverter
export class PlaceConverter implements JsonCustomConvert<IUrl> {

    serialize(el: IUrl): any {
        if (el.hasOwnProperty("name") && el.hasOwnProperty("url")) {
            return {
                "@type": Constants.SchemaPlace,
                [Constants.SchemaUrlValue]: {
                    "@type": Constants.SchemaUrlType,
                    [Constants.SchemaPropID]: {
                        "@type": Constants.SchemaPropVal,
                        [Constants.SchemaPropID]: el.name
                    },
                    [Constants.SchemaUrlValue]: el.url
                }
            };
        } else {
            throw new Error("Serialization Error: missing one or both properties: name, url.");
        }
    }

    deserialize(el: any): IUrl {
        // TODO: temp working solution, check how SpatialCoverage should be send because in the model
        // it's a single Place type object, but returned by DSP-API as array of Place objects
        if (el.hasOwnProperty(Constants.SchemaPropID) && el.hasOwnProperty(Constants.SchemaUrlValue)) {
            const name = el[Constants.SchemaPropID][Constants.SchemaPropID];
            const url = el[Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else if (!el.hasOwnProperty(Constants.SchemaPropID) && el.hasOwnProperty(Constants.SchemaUrlValue)) {
            const name = el[Constants.SchemaUrlValue][Constants.SchemaPropID][Constants.SchemaPropID];
            const url = el[Constants.SchemaUrlValue][Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else {
            throw new Error(`Deserialization Error: missing one or both properties: "${Constants.SchemaUrlType}", 
                "${Constants.SchemaPropID}."`);
        }
    }
}
