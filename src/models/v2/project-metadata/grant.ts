import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseProjectMetadata } from "./base-project-metadata";
import { Organization } from "./organization";
import { Person } from "./person";

/** 
 * @category Model V2 
 */ 
@JsonObject("Grant")
export class Grant extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspHasFunder, PersonOrganizationConverter)
    funder: [Person | Organization | object] | Person | Organization | object = new Person();

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
