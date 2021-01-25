import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { StringArrayOfStringsConverter } from "../custom-converters/string-array-of-strings-converter";
import { BaseProjectMetadata } from "./base-project-metadata";
import { Organization } from "./organization";
import { Person } from "./person";

/** 
 * @category Model V2 
 */ 
@JsonObject("Attribution")
export class Attribution extends BaseProjectMetadata {

    @JsonProperty(Constants.DspHasRole, StringArrayOfStringsConverter)
    role: string[] | string = [];

    @JsonProperty(Constants.ProvAgent, PersonOrganizationConverter)
    agent: Person | Organization | object = new Person();

    constructor() {
        super(Constants.ProvAttribution);
    }
}
