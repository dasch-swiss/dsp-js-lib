import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { EmailConverter } from "../custom-converters/email-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Address } from "./address-definition";

@JsonObject("Organization")
export class Organization {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasAddress", Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasEmail", EmailConverter, true)
    email?: string = undefined;

    @JsonProperty(Constants.DspName, String)
    name: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;
}
