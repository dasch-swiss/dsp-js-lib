import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { HasCardinalityForPropertyConverter } from "../custom-converters/has-cardinality-for-property-converter";
import { SubClassOfConverter } from "../custom-converters/subclass-of-converter";
import { StringLiteralJsonLd } from "../string-literal-json-ld";
import { ClassDefinition, IHasProperty } from "./class-definition";

@JsonObject("ResourceClassDefinition")
export class ResourceClassDefinition extends ClassDefinition {
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

    @JsonProperty(Constants.CanBeInstantiated, Boolean, true)
    canBeInstantiated: boolean = false;
}

@JsonObject("ResourceClassDefinitionWithAllLanguages")
export class ResourceClassDefinitionWithAllLanguages extends ResourceClassDefinition {

    @JsonProperty(Constants.Comment, String, true) // TODO: use custom converter: convert string literal or array of string literals to string or undefined
    comment?: string = undefined;

    @JsonProperty(Constants.Comment, [StringLiteralJsonLd], true) // TODO: use custom converter: convert string literal or array of string literals to an array of string literals
    comments: [] = [];

    @JsonProperty(Constants.Label, String, true) // TODO: use custom converter: convert string literal or array of string literals to string or undefined
    label?: string = undefined;

    @JsonProperty(Constants.Label, [StringLiteralJsonLd]) // TODO: use custom converter: convert string literal or array of string literals to an array of string literals
    labels: [] = [];
}
