import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseFunder } from "./base=funder-definition";

/** 
 * @category Model V2 
 */ 
@JsonObject("Person")
export class Person extends BaseFunder {

    @JsonProperty(Constants.DspHasFamilyName, String, true)
    familyName?: string = undefined;

    @JsonProperty(Constants.DspHasGivenName, String)
    givenName: string = "";

    @JsonProperty(Constants.DspHasJobTitle, String)
    jobTitle: string = "";

    @JsonProperty(Constants.DspIsMemberOf, IdConverter) //convert reference ID to Orgnization
    memberOf: string = "";

    @JsonProperty(Constants.DspSameAs, UrlToUrlObjectConverter, true)
    sameAs?: IUrl = undefined;

    constructor() {
        super(Constants.DspPerson);
    }
}
