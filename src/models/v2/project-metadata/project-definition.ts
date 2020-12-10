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
    
    @JsonProperty(Constants.DspRepoBase + "hasAlternateName", String, true)
    alternateName?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasContactPoint", Person, true)
    contactPoint?: Person = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDataManagementPlan", DataManagementPlan, true)
    dataManagementPlan?: DataManagementPlan = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDescription", String)
    description: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasDiscipline", AdvancedUrlObjectConverter)
    discipline: IUrl = {} as IUrl;
    
    @JsonProperty(Constants.DspRepoBase + "hasEndDate", DateConverter, true)
    endDate?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasFunder", PersonOrganizationConverter) // check if Person, Organization works
    funder: Person | Organization | object = new Person();

    @JsonProperty(Constants.DspRepoBase + "hasGrant", Grant, true)
    grant?: Grant = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasKeywords", [String])
    keywords: string[] = [];

    @JsonProperty(Constants.DspName, String)
    name: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasPublication", String, true)
    publication?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasShortcode", String)
    shortcode: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasSpatialCoverage", [Place])
    spatialCoverage: Place[] = [];

    @JsonProperty(Constants.DspRepoBase + "hasStartDate", DateConverter)
    startDate: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasTemporalCoverage", AdvancedUrlObjectConverter)
    temporalCoverage: IUrl = {} as IUrl;

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter)
    url: IUrl = {} as IUrl;

    constructor() {
        super(Constants.DspRepoBase + "Project");
    }
}
