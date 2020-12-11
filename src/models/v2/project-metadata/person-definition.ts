import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { EmailConverter } from "../custom-converters/email-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Address } from "./address-definition";
import { BaseProjectMetadata } from "./base-project-metadata";

/** 
 * @category Model V2 
 */ 
@JsonObject("Person")
export class Person extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspHasAddress, Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspHasEmail, EmailConverter, true)
    email?: string = undefined; //should the email be actually @id as in JSON-LD?

    @JsonProperty(Constants.DspHasFamilyName, String, true)
    familyName?: string = undefined;

    @JsonProperty(Constants.DspHasGivenName, String)
    givenName: string = "";

    @JsonProperty(Constants.DspHasJobTitle, String)
    jobTitle: string = "";

    @JsonProperty(Constants.DspIsMemberOf, IdConverter) //convert reference ID to Orgnization
    memberOf: string = "";

    @JsonProperty(Constants.DspSameAs, UrlToUrlObjectConverter, true)
    sameAs?: IUrl = undefined;

    constructor() {
        super(Constants.DspPerson);
    }
}
