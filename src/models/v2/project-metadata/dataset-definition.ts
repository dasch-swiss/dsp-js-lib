import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateConverter } from "../custom-converters/date-converter";
import { UrlToStringConverter } from "../custom-converters/url-to-string-converter";
import { Attribution } from "./attribution-definition";
import { Project } from "./project-definition";

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

    @JsonProperty(Constants.dspRepoBase + "hasTypeOfData", [String])
    typeOfData: string[] = [];

    @JsonProperty(Constants.dspRepoBase + "isPartOf", Project)
    project: Project = new Project();

    @JsonProperty(Constants.dspRepoBase + "sameAs", UrlToStringConverter, true)
    sameAs?: string = undefined;
}
