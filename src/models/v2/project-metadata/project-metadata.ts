import { JsonObject, JsonProperty } from "json2typescript";
import { Project } from "../../admin/project";
import { Constants } from "../Constants";
import { Attribution } from "./attribution-definition";

enum TypeofData {
    "xml", "text", "image", "movie", "audio"
}
@JsonObject("ProjectMetadataResponse")
export class ProjectMetadataResponse { //Dataset

    @JsonProperty(Constants.dspRepoBase + "hasAbstract", String)
    abstract: string = ""; //String | URL

    @JsonProperty(Constants.dspRepoBase + "hasAlternativeTitle", String, true)
    alternativeTitle?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasConditionsOfAccess", String)
    conditionsOfAccess: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasDateCreated", Date, true)
    dateCreated?: Date = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDateModified", Date, true)
    dateModified?: Date = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDatePublished", Date, true)
    datePublished?: Date = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDistribution", String, true) //or DataDownlod type/class
    distribution?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDocumentation", String, true)
    documentation?: string = undefined; //String | URL

    @JsonProperty(Constants.dspRepoBase + "hasHowToCite", String)
    howToCite: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasLanguage", [String])
    language: string[] = [];

    @JsonProperty(Constants.dspRepoBase + "hasLicense", URL)
    license: URL = new URL("");

    @JsonProperty(Constants.dspRepoBase + "hasQualifiedAttribution", [Attribution])
    qualifiedAttribution: Attribution[] = [];

    @JsonProperty(Constants.dspRepoBase + "hasStatus", String)
    status: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasTitle", String)
    title: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasTypeOfData", [TypeofData])
    typeOfData: TypeofData[] = [];

    @JsonProperty(Constants.dspRepoBase + "isPartOf", Project)
    partOf: Project = new Project();

    @JsonProperty(Constants.dspRepoBase + "sameAs", URL, true)
    sameAs?: URL = undefined;

// left to temp test purposes as it was wroking example
    // @JsonProperty("http://ns.dasch.swiss/repository#hasName", String)
    // name: string = "";

    // @JsonProperty("http://ns.dasch.swiss/repository#hasFunder", String)
    // founder: string = "";

    // @JsonProperty("http://ns.dasch.swiss/repository#hasKeywords", [String])
    // keywords: string[] = [];

    // @JsonProperty("http://ns.dasch.swiss/repository#hasEndDate", String)
    // endDate: string;

    // @JsonProperty("http://ns.dasch.swiss/repository#hasCategories", String)
    // categories: string;

    // @JsonProperty("@type", String)
    // type: string = "";

    // @JsonProperty("http://ns.dasch.swiss/repository#hasStartDate", String)
    // startDate: string;

    // @JsonProperty("@id", String)
    // id: string = "";
}
