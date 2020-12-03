import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { EmailConverter } from "../custom-converters/email-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Address } from "./address-definition";
import { Organization } from "./organization-definition";

@JsonObject("Person")
export class Person {

    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspRepoBase + "hasAddress", Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasEmail", EmailConverter)
    email: string = ""; //should the email be actually @id as in JSON-LD?

    @JsonProperty(Constants.DspRepoBase + "hasFamilyName", String, true)
    familyName?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasGivenName", String)
    givenName: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasJobTitle", String)
    jobTitle: string = "";

    @JsonProperty(Constants.DspRepoBase + "isMemberOf", IdConverter) //convert reference ID to Orgnization
    memberOf: Organization = new Organization();

    @JsonProperty(Constants.DspRepoBase + "sameAs", UrlToUrlObjectConverter, true)
    sameAs?: string = undefined;
}
