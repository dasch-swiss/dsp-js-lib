import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UnionPersonOrganizationIdConverter } from "../custom-converters/union-person-organization-id-converter";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
import { IId } from "../project-metadata/metadata-interfaces";
import { BaseProjectMetadata } from "./base-project-metadata";
import { Organization } from "./organization";
import { Person } from "./person";

/** 
 * @category Model V2 
 */ 
@JsonObject("Attribution")
export class Attribution extends BaseProjectMetadata {

    @JsonProperty(Constants.DspHasRole, UnionStringArrayOfStringsConverter)
    role: string[] = [];

    @JsonProperty(Constants.ProvAgent, UnionPersonOrganizationIdConverter)
    agent: Person | Organization | IId = new Person();

    constructor() {
        super(Constants.ProvAttribution);
    }
}
