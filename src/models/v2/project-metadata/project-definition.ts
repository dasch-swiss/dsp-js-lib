import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateConverter } from "../custom-converters/date-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToObjectConverter } from "../custom-converters/url-to-object-converter";
import { UrlToStringConverter } from "../custom-converters/url-to-string-converter";
import { DataManagementPlan } from "./data-management-plan-definition";
import { Grant } from "./grant-definition";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";
import { Place } from "./place-definition";

@JsonObject("Project")
export class Project {

    @JsonProperty(Constants.dspRepoBase + "hasAlternateName", String, true)
    alternateName?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasContactPoint", Person, true)
    contactPoint?: Person = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDataManagementPlan", String, true)
    dataManagementPlan?: DataManagementPlan = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDescription", String)
    description: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasDiscipline", UrlToObjectConverter)
    discipline: object = {};
    
    @JsonProperty(Constants.dspRepoBase + "hasEndDate", DateConverter, true)
    endDate?: Date = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasFunder", PersonOrganizationConverter)
    funder: Person | Organization = new Person();

    @JsonProperty(Constants.dspRepoBase + "hasGrant", Grant, true)
    grant?: Grant = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasKeywords", [String])
    keywords: string[] = [];

    @JsonProperty(Constants.dspRepoBase + "hasName", String)
    name: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasPublication", String, true)
    publication?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasShortcode", String)
    shortcode: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasSpatialCoverage", [Place])
    spatialCoverage: Place[] = [];

    @JsonProperty(Constants.dspRepoBase + "hasStartDate", DateConverter)
    startDate: Date = new Date();

    @JsonProperty(Constants.dspRepoBase + "hasTemporalCoverage", UrlToObjectConverter)
    temporalCoverage: object = {};

    @JsonProperty(Constants.dspRepoBase + "hasURL", UrlToStringConverter)
    url: string = "";
}
