import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";

@JsonObject("Place")
export class Place {

    @JsonProperty(Constants.dspRepoBase + "URL", URL)
    url: URL = new URL("");
}