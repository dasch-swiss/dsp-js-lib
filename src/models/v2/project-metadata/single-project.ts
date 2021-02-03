import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateConverter } from "../custom-converters/date-converter";
import { UnionDataManagementPlanIdConverter } from "../custom-converters/union-data-management-plan-id-converter";
import { UnionElementArrayOfElementsConverter } from "../custom-converters/union-element-array-of-elements-converter";
import { UnionPersonOrganizationIdConverter } from "../custom-converters/union-person-organization-id-converter";
import { UnionStringArrayOfStringsConverter } from "../custom-converters/union-string-array-of-strings-converter";
import { UnionUrlStringConverter } from "../custom-converters/union-url-string-converter";
import { IId, IUrl } from "../project-metadata/metadata-interfaces";
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
    contactPoint?: Person[] | Organization[] | IId[] = undefined;

    @JsonProperty(Constants.DspHasDataManagementPlan, UnionDataManagementPlanIdConverter, true)
    dataManagementPlan?: DataManagementPlan | IId = undefined;

    @JsonProperty(Constants.DspHasDescription, String)
    description: string = "";

    @JsonProperty(Constants.DspHasDiscipline, UnionUrlStringConverter)
    discipline: IUrl = {} as IUrl;
    
    @JsonProperty(Constants.DspHasEndDate, DateConverter, true)
    endDate?: string = undefined;

    @JsonProperty(Constants.DspHasFunder, UnionPersonOrganizationIdConverter)
    funder: Person[] | Organization[] | IId[] = [];

    @JsonProperty(Constants.DspHasGrant, UnionElementArrayOfElementsConverter, true)
    grant?: Grant[] | IId[] = undefined;

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

    @JsonProperty(Constants.DspHasTemporalCoverage, UnionUrlStringConverter)
    temporalCoverage: IUrl = {} as IUrl;

    @JsonProperty(Constants.DspHasURL, UnionUrlStringConverter)
    url: IUrl[] = [];

    constructor() {
        super(Constants.DspProject);
    }
}
