import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseProjectMetadata } from "./base-project-metadata";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";

/** 
 * @category Model V2 
 */ 
@JsonObject("Grant")
export class Grant extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspHasFunder, PersonOrganizationConverter, true)
    funder?: Person | Organization | object = undefined;

    @JsonProperty(Constants.DspHasName, String, true)
    name?: string = undefined;

    @JsonProperty(Constants.DspHasNumber, String, true)
    number?: string = undefined;

    @JsonProperty(Constants.DspHasURL, UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;

    constructor() {
        super(Constants.DspGrant);
    }
}
