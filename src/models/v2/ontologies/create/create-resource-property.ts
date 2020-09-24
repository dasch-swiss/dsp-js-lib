import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "../../../admin/string-literal";
import { IdConverter } from "../../custom-converters/id-converter";
import { UpdateOntology } from "../update/update-ontology";

@JsonObject("CreateResourceProperty")
export class CreateResourceProperty {

    @JsonProperty("subjectType", IdConverter, true)
    subjectType?: string = undefined;

    @JsonProperty("objectType", IdConverter)
    objectType: string = "";

    @JsonProperty("name", String)
    name: string = "";

    @JsonProperty("labels", [StringLiteral])
    labels: StringLiteral[] = [];

    @JsonProperty("comments", [StringLiteral], true)
    comments: StringLiteral[] = [];

    @JsonProperty("subPropertyOf", [String])
    subPropertyOf: string[] = [];

    @JsonProperty("guiElement", IdConverter, true)
    guiElement?: string = undefined;

    @JsonProperty("guiAttributes", [String], true)
    guiAttributes?: string[] = undefined;

}
