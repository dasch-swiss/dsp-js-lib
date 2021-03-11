import { JsonObject, JsonProperty } from "json2typescript";
import { IId } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { UnionPersonOrganizationIdConverter } from "../custom-converters/union-person-organization-id-converter";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
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
    agent: Array<Person | Organization | IId> = [];

    constructor() {
        super(Constants.ProvAttribution);
    }
}
