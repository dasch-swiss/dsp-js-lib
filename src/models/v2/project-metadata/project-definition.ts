import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { AdvancedUrlObjectConverter } from "../custom-converters/advanced-url-object-converter";
import { DateConverter } from "../custom-converters/date-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { IUrl } from "./../custom-converters/base-url-converter";
import { BaseProjectMetadata } from "./base-project-metadata";
import { DataManagementPlan } from "./data-management-plan-definition";
import { Grant } from "./grant-definition";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";
import { Place } from "./place-definition";

/** 
 * @category Model V2 
 */ 
@JsonObject("SingleProject")
export class SingleProject extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspHasAlternateName, String, true)
    alternateName?: string = undefined;

    @JsonProperty(Constants.DspHasContactPoint, Person, true)
    contactPoint?: Person = undefined;

    @JsonProperty(Constants.DspHasDataManagementPlan, DataManagementPlan, true)
    dataManagementPlan?: DataManagementPlan = undefined;

    @JsonProperty(Constants.DspHasDescription, String)
    description: string = "";

    @JsonProperty(Constants.DspHasDiscipline, AdvancedUrlObjectConverter)
    discipline: IUrl = {} as IUrl;
    
    @JsonProperty(Constants.DspHasEndDate, DateConverter, true)
    endDate?: string = undefined;

    @JsonProperty(Constants.DspHasFunder, PersonOrganizationConverter)
    funder: Person | Organization | object = new Person();

    @JsonProperty(Constants.DspHasGrant, Grant, true)
    grant?: Grant = undefined;

    @JsonProperty(Constants.DspHasKeywords, [String])
    keywords: string[] = [];

    @JsonProperty(Constants.DspHasName, String)
    name: string = "";

    @JsonProperty(Constants.DspHasPublication, String, true)
    publication?: string = undefined;

    @JsonProperty(Constants.DspHasShortcode, String)
    shortcode: string = "";

    @JsonProperty(Constants.DspHasSpatialCoverage, [Place])
    spatialCoverage: Place[] = [];

    @JsonProperty(Constants.DspHasStartDate, DateConverter)
    startDate: string = "";

    @JsonProperty(Constants.DspHasTemporalCoverage, AdvancedUrlObjectConverter)
    temporalCoverage: IUrl = {} as IUrl;

    @JsonProperty(Constants.DspHasURL, UrlToUrlObjectConverter)
    url: IUrl = {} as IUrl;

    constructor() {
        super(Constants.DspProject);
    }
}
