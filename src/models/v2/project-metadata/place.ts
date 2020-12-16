import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { PlaceConverter } from "../custom-converters/place-converter";

/** 
* @category Model V2 
*/ 
@JsonObject("Place")
export class Place {

    @JsonProperty(Constants.SchemaUrlValue, PlaceConverter)
    place: IUrl = {} as IUrl;
}
