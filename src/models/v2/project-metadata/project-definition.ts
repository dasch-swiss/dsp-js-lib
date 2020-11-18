import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DataManagementPlan } from "./data-management-plan-definition";
import { Grant } from "./grant-definition";
import { Person } from "./person-definition";
import { Place } from "./place-definition";

@JsonObject("Project")
export class Project {

    @JsonProperty(Constants.dspRepoBase + "hasAlternateName", String)
    alternateName: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasContactPoint", Person)
    contactPoint: Person = new Person();

    @JsonProperty(Constants.dspRepoBase + "sameAs", URL)
    sameAs: URL = new URL(""); 

    @JsonProperty(Constants.dspRepoBase + "hasDataManagementPlan", String)
    dataManagementPlan: DataManagementPlan = new DataManagementPlan();

    @JsonProperty(Constants.dspRepoBase + "hasDescription", String)
    description: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasDiscipline", URL)
    discipline: URL = new URL(""); 
    
    @JsonProperty(Constants.dspRepoBase + "hasEndDate", Date)
    endDate: Date = new Date();

    @JsonProperty(Constants.dspRepoBase + "hasFunder", Person) //Person | Organization
    funder: Person = new Person();

    @JsonProperty(Constants.dspRepoBase + "hasGrant", Grant)
    grant: Grant = new Grant();

    @JsonProperty(Constants.dspRepoBase + "hasKeywords", [String])
    keywords: string[] = [];

    @JsonProperty(Constants.dspRepoBase + "hasName", String)
    name: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasPublication", String)
    publication: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasShortcode", String)
    shortcode: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasSpatialCoverage", [Place])
    spatialCoverage: Place[] = [];

    @JsonProperty(Constants.dspRepoBase + "hasStartDate", Date)
    startDate: Date = new Date();

    @JsonProperty(Constants.dspRepoBase + "hasTemporalCoverage", URL)
    temporalCoverage: URL = new URL(""); 

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL)
    url: URL = new URL(""); 
}
