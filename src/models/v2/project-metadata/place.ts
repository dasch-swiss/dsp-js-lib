import { JsonObject, JsonProperty } from "json2typescript";
import { IUrl } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { PlaceConverter } from "../custom-converters/place-converter";

/** 
 * @category Model V2 
 */ 
@JsonObject("Place")
export class Place {

    @JsonProperty(Constants.SchemaUrlValue, PlaceConverter)
    place: IUrl = {} as IUrl;
}
