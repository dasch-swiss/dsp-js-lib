import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Address } from "./address";
import { BaseProjectMetadata } from "./base-project-metadata";

/** 
 * @category Model V2 
 */ 
@JsonObject("Organization")
export class Organization extends BaseProjectMetadata{

    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspHasAddress, Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspHasEmail, String, true)
    email?: string = undefined;

    @JsonProperty(Constants.DspHasName, String)
    name: string = "";

    @JsonProperty(Constants.DspHasURL, UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;

    constructor() {
        super(Constants.DspOrganization);
    }
}
