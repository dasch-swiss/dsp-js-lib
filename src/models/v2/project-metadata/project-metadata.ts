import { Any, JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateConverter } from "../custom-converters/date-converter";
import { UrlToStringConverter } from "../custom-converters/url-to-string-converter";
import { Attribution } from "./attribution-definition";
import { Person } from "./person-definition";
import { Project } from "./project-definition";

enum TypeofData {
    "xml", "text", "image", "movie", "audio"
}
@JsonObject("Dataset")
export class Dataset {

    @JsonProperty(Constants.dspRepoBase + "hasAbstract", UrlToStringConverter)
    abstract: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasAlternativeTitle", String, true)
    alternativeTitle?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasConditionsOfAccess", String)
    conditionsOfAccess: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasDateCreated", DateConverter, true)
    dateCreated?: Date = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDateModified", DateConverter, true)
    dateModified?: Date = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDatePublished", DateConverter, true)
    datePublished?: Date = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDistribution", UrlToStringConverter, true)
    distribution?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasDocumentation", UrlToStringConverter, true)
    documentation?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasHowToCite", String)
    howToCite: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasLanguage", [String])
    language: string[] = [];

    @JsonProperty(Constants.dspRepoBase + "hasLicense", UrlToStringConverter)
    license: string = "";

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

    @JsonProperty(Constants.dspRepoBase + "sameAs", UrlToStringConverter, true)
    sameAs?: string = undefined;

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

@JsonObject("ProjectsMetdaata")
export class ProjectsMetadata {

    @JsonProperty("@graph", [Dataset])
    projects: Dataset[] = [];

}
