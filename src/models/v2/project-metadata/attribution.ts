import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";
import { StringArrayOfStringsConverter } from "../custom-converters/string-array-of-strings-converter";
import { BaseProjectMetadata } from "./base-project-metadata";

/** 
 * @category Model V2 
 */ 
@JsonObject("Attribution")
export class Attribution extends BaseProjectMetadata {

    @JsonProperty(Constants.DspHasRole, StringArrayOfStringsConverter)
    role: string[] | string = [];

    @JsonProperty(Constants.ProvAgent, IdConverter)
    agent: string = "";

    constructor() {
        super(Constants.ProvAttribution);
    }
}
