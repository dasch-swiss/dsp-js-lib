import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";
import { HasCardinalityForPropertyConverter } from "../../custom-converters/has-cardinality-for-property-converter";
import { IHasProperty } from "../class-definition";

@JsonObject("AddCardinalityToResourceClass")
export class AddCardinalityToResourceClass {

    @JsonProperty("@id", String)
    id: string;

    @JsonProperty("@type", String)
    readonly type = Constants.Ontology;

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter)
    lastModificationDate: string;

    @JsonProperty("@graph", HasCardinalityForPropertyConverter)
    cardinalities: IHasProperty[] = [];
}
