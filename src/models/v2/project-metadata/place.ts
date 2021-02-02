import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { PlaceConverter } from "../custom-converters/place-converter";
import { IUrl } from "../project-metadata/metadata-interfaces";

/** 
 * @category Model V2 
 */ 
@JsonObject("Place")
export class Place {

    @JsonProperty(Constants.SchemaUrlValue, PlaceConverter)
    place: IUrl = {} as IUrl;
}
