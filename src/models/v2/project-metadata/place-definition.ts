import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UrlToObjectConverter } from "../custom-converters/url-to-object-converter";

@JsonObject("Place")
export class Place {

    @JsonProperty(Constants.urlTypeLowerCase, UrlToObjectConverter)
    place: object = {};
}