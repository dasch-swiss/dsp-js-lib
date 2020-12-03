import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateConverter } from "../custom-converters/date-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToObjectConverter } from "../custom-converters/url-to-object-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { DataManagementPlan } from "./data-management-plan-definition";
import { Grant } from "./grant-definition";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";
import { Place } from "./place-definition";

@JsonObject("SingleProject")
export class SingleProject {

    @JsonProperty(Constants.DspRepoBase + "hasAlternateName", String, true)
    alternateName?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasContactPoint", Person, true)
    contactPoint?: Person = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDataManagementPlan", DataManagementPlan, true)
    dataManagementPlan?: DataManagementPlan = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDescription", String)
    description: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasDiscipline", UrlToObjectConverter)
    discipline: object = {};
    
    @JsonProperty(Constants.DspRepoBase + "hasEndDate", DateConverter, true)
    endDate?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasFunder", PersonOrganizationConverter) // check if Person, Organization works
    funder: Person | Organization = new Person();

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

    @JsonProperty(Constants.DspRepoBase + "hasTemporalCoverage", UrlToObjectConverter)
    temporalCoverage: object = {};

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter)
    url: string = "";
}
