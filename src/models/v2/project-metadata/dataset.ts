import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { DateConverter } from "../custom-converters/date-converter";
import { DistributionConverter } from "../custom-converters/distribution-converter";
import { UnionElementArrayOfElementsConverter } from "../custom-converters/union-element-array-of-elements-converter";
import { UnionSingleProjctIdConverter } from "../custom-converters/union-single-project-id-converter";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
import { UnionUrlStringConverter } from "../custom-converters/union-url-string-converter";
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

    @JsonProperty(Constants.DspHasAbstract, UnionUrlStringConverter)
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

    @JsonProperty(Constants.DspHasDocumentation, UnionUrlStringConverter, true)
    documentation?: string[] | string = undefined;

    @JsonProperty(Constants.DspHasHowToCite, String)
    howToCite: string = "";

    @JsonProperty(Constants.DspHasLanguage, UnionStringArrayOfStringsConverter)
    language: string[] | string = [];

    @JsonProperty(Constants.DspHasLicense, UrlToUrlObjectConverter)
    license: IUrl[] | IUrl = [];

    @JsonProperty(Constants.DspHasQualifiedAttribution, UnionElementArrayOfElementsConverter)
    qualifiedAttribution: Attribution[] | Attribution = [];

    @JsonProperty(Constants.DspHasStatus, String)
    status: string = "";

    @JsonProperty(Constants.DspHasTitle, String)
    title: string = "";

    // TODO: add enum >> In planning, Ongoing, On hold, Finished
    @JsonProperty(Constants.DspHasTypeOfData, UnionStringArrayOfStringsConverter)
    typeOfData: string[] | string = [];

    @JsonProperty(Constants.DspIsPartOf, UnionSingleProjctIdConverter)
    project: SingleProject = new SingleProject();

    @JsonProperty(Constants.DspSameAs, UrlToUrlObjectConverter, true)
    sameAs?: IUrl[] | IUrl = undefined;

    constructor() {
        super(Constants.DspDataset);
    }
}
