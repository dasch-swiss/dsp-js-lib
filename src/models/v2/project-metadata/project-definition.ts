import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
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

    @JsonProperty(Constants.dspRepoBase + "sameAs", URL)
    sameAs: URL = new URL("");

    @JsonProperty(Constants.dspRepoBase + "hasDataManagementPlan", String, true)
    dataManagementPlan?: DataManagementPlan = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDescription", String)
    description: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasDiscipline", URL)
    discipline: URL = new URL(""); //String | URL
    
    @JsonProperty(Constants.dspRepoBase + "hasEndDate", Date, true)
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

    @JsonProperty(Constants.dspRepoBase + "hasStartDate", Date)
    startDate: Date = new Date();

    @JsonProperty(Constants.dspRepoBase + "hasTemporalCoverage", URL)
    temporalCoverage: URL = new URL(""); //String | URL

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL)
    url: URL = new URL("");
}
