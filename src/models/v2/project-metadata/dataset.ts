import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateConverter } from "../custom-converters/date-converter";
import { DistributionConverter } from "../custom-converters/distribution-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { IUrl } from "../custom-converters/base-url-converter";
import { Attribution } from "./attribution";
import { BaseProjectMetadata } from "./base-project-metadata";
import { SingleProject } from "./single-project";

/** 
 * @category Model V2 
 */ 
@JsonObject("Dataset")
export class Dataset extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspHasAbstract, String) // URL | String
    abstract: string = "";

    @JsonProperty(Constants.DspHasAlternativeTitle, String, true)
    alternativeTitle?: string = undefined;

    @JsonProperty(Constants.DspHasConditionsOfAccess, String)
    conditionsOfAccess: string = "";

    @JsonProperty(Constants.DspHasDateCreated, DateConverter, true)
    dateCreated?: string = undefined;

    @JsonProperty(Constants.DspHasDateModified, DateConverter, true)
    dateModified?: string = undefined;

    @JsonProperty(Constants.DspHasDatePublished, DateConverter, true)
    datePublished?: string = undefined;

    @JsonProperty(Constants.DspHasDistribution, DistributionConverter, true)
    distribution?: IUrl = undefined;

    @JsonProperty(Constants.DspHasDocumentation, String, true) // URL | String
    documentation?: string = undefined;

    @JsonProperty(Constants.DspHasHowToCite, String)
    howToCite: string = "";

    @JsonProperty(Constants.DspHasLanguage, [String])
    language: string[] = [];

    @JsonProperty(Constants.DspHasLicense, UrlToUrlObjectConverter)
    license: IUrl = {}  as IUrl;

    @JsonProperty(Constants.DspHasQualifiedAttribution, [Attribution])
    qualifiedAttribution: Attribution[] = [];

    @JsonProperty(Constants.DspHasStatus, String)
    status: string = "";

    @JsonProperty(Constants.DspHasTitle, String)
    title: string = "";

    @JsonProperty(Constants.DspHasTypeOfData, [String])
    typeOfData: string[] = [];

    @JsonProperty(Constants.DspIsPartOf, SingleProject)
    project: SingleProject = new SingleProject();

    @JsonProperty(Constants.DspSameAs, UrlToUrlObjectConverter, true)
    sameAs?: IUrl = undefined;

    constructor() {
        super(Constants.DspDataset);
    }
}
