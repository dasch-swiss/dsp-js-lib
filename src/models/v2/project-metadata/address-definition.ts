import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";

@JsonObject("Address")
export class Address {

    @JsonProperty(Constants.dspRepoBase + "addressLocality", String)
    addressLocality: string = "";

    @JsonProperty(Constants.dspRepoBase + "postalCode", String)
    postalCode: string = "";

    @JsonProperty(Constants.dspRepoBase + "streetAddress", String)
    streetAddress: string = "";
}
