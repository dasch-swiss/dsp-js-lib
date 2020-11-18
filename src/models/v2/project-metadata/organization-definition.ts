import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { Address } from "./address-definition";

@JsonObject("Organization")
export class Organization {

    @JsonProperty(Constants.dspRepoBase + "hasAddress", Address)
    address: Address = new Address();

    @JsonProperty(Constants.dspRepoBase + "hasEmail", URL)
    email: URL = new URL(""); 

    @JsonProperty(Constants.dspRepoBase + "hasName", String)
    name: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL)
    url: URL = new URL(""); 
}
