import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "../../../admin/string-literal";
import { Constants } from "../../Constants";
import { IdConverter } from "../../custom-converters/id-converter";
import { StringLiteralToStringLiteralArrayConverter } from "../../custom-converters/string-literal-to-string-literal-array-converter";
import { SubClassOfConverter } from "../../custom-converters/subclass-of-converter";
import { StringLiteralV2 } from "../../string-literal-v2";
import { UpdateOntology } from "../update/update-ontology";

@JsonObject("CreateResourceProperty")
export class CreateResourceProperty {

    name: string = "";

    @JsonProperty(Constants.SubjectType, IdConverter, true)
    subjectType?: string = undefined;

    @JsonProperty(Constants.ObjectType, IdConverter)
    objectType: string = "";

    @JsonProperty(Constants.Label, StringLiteralToStringLiteralArrayConverter)
    label: StringLiteralV2[] = [];

    @JsonProperty(Constants.Comment, StringLiteralToStringLiteralArrayConverter)
    comment: StringLiteralV2[] = [];

    @JsonProperty(Constants.SubPropertyOf, SubClassOfConverter)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.GuiElement, IdConverter, true)
    guiElement?: string = undefined;

    @JsonProperty(Constants.GuiAttribute, [String], true)
    guiAttributes?: string[] = undefined;

}

/**
 * @internal
 */
@JsonObject("CreateResourcePropertyPayload")
export class CreateResourcePropertyPayload extends CreateResourceProperty {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = Constants.ObjectProperty;

}
