import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { EmailConverter } from "../custom-converters/email-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { UrlToStringConverter } from "../custom-converters/url-to-string-converter";
import { Address } from "./address-definition";
import { Organization } from "./organization-definition";

@JsonObject("Person")
export class Person {
    
    @JsonProperty(Constants.dspRepoBase + "hasAddress", Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasEmail", EmailConverter)
    email: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasFamilyName", String, true)
    fmilyName?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasGivenName", String)
    givenName: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasJobTitle", String)
    jobTitle: string = "";

    @JsonProperty(Constants.dspRepoBase + "isMemberOf", IdConverter) //convert reference ID to Orgnization
    memberOf: Organization = new Organization();

    @JsonProperty(Constants.dspRepoBase + "sameAs", UrlToStringConverter, true)
    sameAs?: string = undefined;
}
