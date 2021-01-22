import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { AdvancedUrlObjectConverter } from "../custom-converters/advanced-url-object-converter";
import { IUrl } from "../custom-converters/base-url-converter";
import { DateConverter } from "../custom-converters/date-converter";
import { ElementArrayOfElementsConverter } from "../custom-converters/element-array-of-elements-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { StringArrayOfStringsConverter } from "../custom-converters/string-array-of-strings-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseProjectMetadata } from "./base-project-metadata";
import { DataManagementPlan } from "./data-management-plan";
import { Grant } from "./grant";
import { Organization } from "./organization";
import { Person } from "./person";
import { Place } from "./place";

/** 
 * @category Model V2 
 */ 
@JsonObject("SingleProject")
export class SingleProject extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspHasAlternateName, StringArrayOfStringsConverter, true)
    alternateName?: string[] | string = undefined;

    @JsonProperty(Constants.DspHasContactPoint, Person, true)
    contactPoint?: Person = undefined;

    @JsonProperty(Constants.DspHasDataManagementPlan, DataManagementPlan, true)
    dataManagementPlan?: DataManagementPlan = undefined;

    @JsonProperty(Constants.DspHasDescription, String)
    description: string = "";

    @JsonProperty(Constants.DspHasDiscipline, AdvancedUrlObjectConverter) // String | URL
    discipline: IUrl = {} as IUrl;
    
    @JsonProperty(Constants.DspHasEndDate, DateConverter, true)
    endDate?: string = undefined;

    @JsonProperty(Constants.DspHasFunder, PersonOrganizationConverter)
    funder: [Person | Organization | object] | Person | Organization | object = new Person();

    @JsonProperty(Constants.DspHasGrant, ElementArrayOfElementsConverter, true)
    grant?: Grant[] | Grant = undefined;

    @JsonProperty(Constants.DspHasKeywords, StringArrayOfStringsConverter)
    keywords: string[] | string = [];

    @JsonProperty(Constants.DspHasName, String)
    name: string = "";

    @JsonProperty(Constants.DspHasPublication, StringArrayOfStringsConverter, true)
    publication?: string[] | string = undefined;

    @JsonProperty(Constants.DspHasShortcode, String)
    shortcode: string = "";

    @JsonProperty(Constants.DspHasSpatialCoverage, ElementArrayOfElementsConverter)
    spatialCoverage: Place[] | Place = [];

    @JsonProperty(Constants.DspHasStartDate, DateConverter)
    startDate: string = "";

    // 1-n
    @JsonProperty(Constants.DspHasTemporalCoverage, AdvancedUrlObjectConverter) // String | URL
    temporalCoverage: IUrl = {} as IUrl;

    // 1-2
    @JsonProperty(Constants.DspHasURL, UrlToUrlObjectConverter)
    url: IUrl = {} as IUrl;

    constructor() {
        super(Constants.DspProject);
    }
}
