import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { OrganizationIdConverter } from "../custom-converters/orgnization-id-converter";
import { StringArrayOfStringsConverter } from "../custom-converters/string-array-of-strings-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Address } from "./address";
import { BaseProjectMetadata } from "./base-project-metadata";
import { Organization } from "./organization";

/** 
 * @category Model V2 
 */ 
@JsonObject("Person")
export class Person extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";
    
    // 0-n
    @JsonProperty(Constants.DspHasAddress, Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspHasEmail, StringArrayOfStringsConverter, true)
    email?: string[] | string = undefined;

    @JsonProperty(Constants.DspHasFamilyName, String, true)
    familyName?: string = undefined;

    @JsonProperty(Constants.DspHasGivenName, String)
    givenName: string = "";

    @JsonProperty(Constants.DspHasJobTitle, StringArrayOfStringsConverter)
    jobTitle: string[] | string = [];

    @JsonProperty(Constants.DspIsMemberOf, OrganizationIdConverter)
    memberOf: Organization[] | Organization = new Organization();

    // 0-n
    @JsonProperty(Constants.DspSameAs, UrlToUrlObjectConverter, true)
    sameAs?: IUrl = undefined;

    constructor() {
        super(Constants.DspPerson);
    }
}
