import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { HasCardinalityForPropertyConverter } from "../custom-converters/has-cardinality-for-property-converter";
import { SubClassOfConverter } from "../custom-converters/subclass-of-converter";
import { ClassDefinition, IHasProperty } from "./class-definition";

@JsonObject("StandoffClassDefinition")
export class StandoffClassDefinition extends ClassDefinition {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubClassOf, SubClassOfConverter)
    subClassOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.SubClassOf, HasCardinalityForPropertyConverter)
    propertiesList: IHasProperty[] = [];
}
