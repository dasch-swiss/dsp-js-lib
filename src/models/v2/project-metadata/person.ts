import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UnionOrganizationIdConverter } from "../custom-converters/union-orgnization-id-converter";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { IId, IUrl } from "../project-metadata/metadata-interfaces";
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
    
    @JsonProperty(Constants.DspHasAddress, Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspHasEmail, UnionStringArrayOfStringsConverter, true)
    email?: string[] = undefined;

    @JsonProperty(Constants.DspHasFamilyName, String, true)
    familyName?: string = undefined;

    @JsonProperty(Constants.DspHasGivenName, String)
    givenName: string = "";

    @JsonProperty(Constants.DspHasJobTitle, UnionStringArrayOfStringsConverter)
    jobTitle: string[] = [];

    @JsonProperty(Constants.DspIsMemberOf, UnionOrganizationIdConverter)
    memberOf: Organization[] | IId = [];

    @JsonProperty(Constants.DspSameAs, UrlToUrlObjectConverter, true)
    sameAs?: IUrl = undefined;

    constructor() {
        super(Constants.DspPerson);
    }
}
