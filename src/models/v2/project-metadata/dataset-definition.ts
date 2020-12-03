import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateConverter } from "../custom-converters/date-converter";
import { DistributionConverter } from "../custom-converters/distribution-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Attribution } from "./attribution-definition";
import { SingleProject } from "./project-definition";

@JsonObject("Dataset")
export class Dataset {

    @JsonProperty(Constants.DspRepoBase + "hasAbstract", String) // URL | String
    abstract: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasAlternativeTitle", String, true)
    alternativeTitle?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasConditionsOfAccess", String)
    conditionsOfAccess: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasDateCreated", DateConverter, true)
    dateCreated?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDateModified", DateConverter, true)
    dateModified?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDatePublished", DateConverter, true)
    datePublished?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDistribution", DistributionConverter, true)
    distribution?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasDocumentation", String, true) // URL | String
    documentation?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasHowToCite", String)
    howToCite: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasLanguage", [String])
    language: string[] = [];

    @JsonProperty(Constants.DspRepoBase + "hasLicense", UrlToUrlObjectConverter)
    license: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasQualifiedAttribution", [Attribution])
    qualifiedAttribution: Attribution[] = [];

    @JsonProperty(Constants.DspRepoBase + "hasStatus", String)
    status: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasTitle", String)
    title: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasTypeOfData", [String])
    typeOfData: string[] = [];

    @JsonProperty(Constants.DspRepoBase + "isPartOf", SingleProject)
    project: SingleProject = new SingleProject();

    @JsonProperty(Constants.DspRepoBase + "sameAs", UrlToUrlObjectConverter, true)
    sameAs?: string = undefined;
}
