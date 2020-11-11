import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { GuiAttributeConverter } from "../custom-converters/gui-attribute-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { SubPropertyOfConverter } from "../custom-converters/subproperty-of-converter";
import { PropertyDefinition } from "./property-definition";
import { StringLiteralToStringConverter } from "../custom-converters/string-literal-to-string-converter";
import { StringLiteralV2 } from "../string-literal-v2";
import { StringLiteralToStringLiteralArrayConverter } from "../custom-converters/string-literal-to-string-literal-array-converter";

@JsonObject("ResourcePropertyDefinition")
export class ResourcePropertyDefinition extends PropertyDefinition {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubPropertyOf, SubPropertyOfConverter, true)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.Comment, String)
    comment: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.GuiElement, IdConverter, true)
    guiElement?: string = undefined;

    @JsonProperty(Constants.SubjectType, IdConverter, true)
    subjectType?: string = undefined;

    @JsonProperty(Constants.ObjectType, IdConverter, true)
    objectType?: string = undefined;

    @JsonProperty(Constants.IsLinkProperty, Boolean, true)
    isLinkProperty: boolean = false;

    @JsonProperty(Constants.IsLinkValueProperty, Boolean, true)
    isLinkValueProperty: boolean = false;

    @JsonProperty(Constants.IsEditable, Boolean, true)
    isEditable: boolean = false;

    @JsonProperty(Constants.GuiAttribute, GuiAttributeConverter, true)
    guiAttributes: string[] = [];
}

@JsonObject("ResourcePropertyDefinitionWithAllLanguages")
export class ResourcePropertyDefinitionWithAllLanguages extends ResourcePropertyDefinition {

    @JsonProperty(Constants.Comment, StringLiteralToStringConverter)
    comment: string = "";

    @JsonProperty(Constants.Comment, StringLiteralToStringLiteralArrayConverter, true)
    comments: StringLiteralV2[] = [];

    @JsonProperty(Constants.Label, StringLiteralToStringConverter)
    label: string = "";

    @JsonProperty(Constants.Label, StringLiteralToStringLiteralArrayConverter, true)
    labels: StringLiteralV2[] = [];
}