import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { EmailConverter } from "../custom-converters/email-converter";
import { UrlToStringConverter } from "../custom-converters/url-to-string-converter";
import { Address } from "./address-definition";

@JsonObject("Organization")
export class Organization {

    @JsonProperty(Constants.dspRepoBase + "hasAddress", Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasEmail", EmailConverter, true)
    email?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasName", String)
    name: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasURL", UrlToStringConverter, true)
    url?: string = undefined;
}
