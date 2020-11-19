import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { Address } from "./address-definition";

@JsonObject("Organization")
export class Organization {

    @JsonProperty(Constants.dspRepoBase + "hasAddress", Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasEmail", URL, true)
    email?: URL = undefined; //IRI?

    @JsonProperty(Constants.dspRepoBase + "hasName", String)
    name: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL, true)
    url?: URL = undefined;
}
