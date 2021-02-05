import { JsonObject, JsonProperty } from "json2typescript";
import { IUrl } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
import { UnionUrlStringConverter } from "../custom-converters/union-url-string-converter";
import { Address } from "./address";
import { BaseProjectMetadata } from "./base-project-metadata";

/** 
 * @category Model V2 
 */ 
@JsonObject("Organization")
export class Organization extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspHasAddress, Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspHasEmail, String, true)
    email?: string = undefined;

    @JsonProperty(Constants.DspHasName, UnionStringArrayOfStringsConverter)
    name: string[] = [];

    @JsonProperty(Constants.DspHasURL, UnionUrlStringConverter, true)
    url?: IUrl = undefined;

    constructor() {
        super(Constants.DspOrganization);
    }
}
