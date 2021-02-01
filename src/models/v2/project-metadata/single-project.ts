import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { UnionDataManagementPlanIdConverter } from "../custom-converters/union-data-management-plan-id-converter";
import { DateConverter } from "../custom-converters/date-converter";
import { UnionAdvancedUrlObjectConverter } from "../custom-converters/union-advanced-url-object-converter";
import { UnionElementArrayOfElementsConverter } from "../custom-converters/union-element-array-of-elements-converter";
import { UnionPersonOrganizationIdConverter } from "../custom-converters/union-person-organization-id-converter";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseProjectMetadata } from "./base-project-metadata";
import { DataManagementPlan } from "./data-management-plan";
import { Grant } from "./grant";
import { Organization } from "./organization";
import { Person } from "./person";
import { Place } from "./place";

/** 
 * @category Model V2 
 */ 
@JsonObject("SingleProject")
export class SingleProject extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspHasAlternateName, UnionStringArrayOfStringsConverter, true)
    alternateName?: string[] = undefined;

    @JsonProperty(Constants.DspHasContactPoint, UnionPersonOrganizationIdConverter, true)
    contactPoint?: Person[] | Organization[] = undefined;

    @JsonProperty(Constants.DspHasDataManagementPlan, UnionDataManagementPlanIdConverter, true)
    dataManagementPlan?: DataManagementPlan | object = undefined;

    @JsonProperty(Constants.DspHasDescription, String)
    description: string = "";

    @JsonProperty(Constants.DspHasDiscipline, UnionAdvancedUrlObjectConverter)
    discipline: IUrl = {} as IUrl;
    
    @JsonProperty(Constants.DspHasEndDate, DateConverter, true)
    endDate?: string = undefined;

    @JsonProperty(Constants.DspHasFunder, UnionPersonOrganizationIdConverter)
    funder: Person[] | Organization[] | object[] = [];

    @JsonProperty(Constants.DspHasGrant, UnionElementArrayOfElementsConverter, true)
    grant?: Grant[] = undefined;

    @JsonProperty(Constants.DspHasKeywords, UnionStringArrayOfStringsConverter)
    keywords: string[] = [];

    @JsonProperty(Constants.DspHasName, String)
    name: string = "";

    @JsonProperty(Constants.DspHasPublication, UnionStringArrayOfStringsConverter, true)
    publication?: string[] = undefined;

    @JsonProperty(Constants.DspHasShortcode, String)
    shortcode: string = "";

    @JsonProperty(Constants.DspHasSpatialCoverage, UnionElementArrayOfElementsConverter)
    spatialCoverage: Place[] = [];

    @JsonProperty(Constants.DspHasStartDate, DateConverter)
    startDate: string = "";

    @JsonProperty(Constants.DspHasTemporalCoverage, UnionAdvancedUrlObjectConverter)
    temporalCoverage: IUrl = {} as IUrl;

    @JsonProperty(Constants.DspHasURL, UrlToUrlObjectConverter)
    url: IUrl[] = [];

    constructor() {
        super(Constants.DspProject);
    }
}
