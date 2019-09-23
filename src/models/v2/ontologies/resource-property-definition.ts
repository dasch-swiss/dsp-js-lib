import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { GuiAttributeConverter } from "../custom-converters/gui-attribute-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { SubPropertyOfConverter } from "../custom-converters/subproperty-of-converter";
import { PropertyDefinition } from "./property-definition";

@JsonObject("ResourcePropertyDefinition")
export class ResourcePropertyDefinition extends PropertyDefinition {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubPropertyOf, SubPropertyOfConverter, true)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

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
