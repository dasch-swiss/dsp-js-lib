import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { DateConverter } from "../custom-converters/date-converter";
import { DistributionConverter } from "../custom-converters/distribution-converter";
import { StringArrayOfStringsConverter } from "../custom-converters/string-array-of-strings-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
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

    // 1-n
    @JsonProperty(Constants.DspHasAbstract, StringArrayOfStringsConverter) // URL | String
    abstract: string[] | string = [];

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

    // 0-n
    @JsonProperty(Constants.DspHasDocumentation, StringArrayOfStringsConverter, true) // URL | String
    documentation?: string[] | string = undefined;

    @JsonProperty(Constants.DspHasHowToCite, String)
    howToCite: string = "";

    @JsonProperty(Constants.DspHasLanguage, StringArrayOfStringsConverter)
    language: string[] | string = [];

    // 1-n
    @JsonProperty(Constants.DspHasLicense, UrlToUrlObjectConverter)
    license: IUrl = {}  as IUrl;

    // 1-n
    @JsonProperty(Constants.DspHasQualifiedAttribution, [Attribution])
    qualifiedAttribution: Attribution[] = [];

    @JsonProperty(Constants.DspHasStatus, String)
    status: string = "";

    @JsonProperty(Constants.DspHasTitle, String)
    title: string = "";

    // 1-n
    // TODO: add enum >> In planning, Ongoing, On hold, Finished
    @JsonProperty(Constants.DspHasTypeOfData, StringArrayOfStringsConverter)
    typeOfData: string[] | string = [];

    @JsonProperty(Constants.DspIsPartOf, SingleProject)
    project: SingleProject = new SingleProject();

    // 0-n
    @JsonProperty(Constants.DspSameAs, UrlToUrlObjectConverter, true)
    sameAs?: IUrl = undefined;

    constructor() {
        super(Constants.DspDataset);
    }
}
