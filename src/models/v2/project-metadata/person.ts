import { JsonObject, JsonProperty } from "json2typescript";
import { IId, IUrl } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { UnionOrganizationIdConverter } from "../custom-converters/union-orgnization-id-converter";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
import { UnionUrlStringConverter } from "../custom-converters/union-url-string-converter";
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
    memberOf: Organization[] | IId[] = [];

    @JsonProperty(Constants.DspSameAs, UnionUrlStringConverter, true)
    sameAs?: IUrl[] = undefined;

    constructor() {
        super(Constants.DspPerson);
    }
}
