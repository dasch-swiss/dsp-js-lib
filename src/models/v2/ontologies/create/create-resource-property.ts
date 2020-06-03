import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("CreateResourceProperty")
export class CreateResourceProperty {

    @JsonProperty("name", String)
    name: string = "";

    @JsonProperty("label", String)
    label: string = "";

    @JsonProperty("comment", String)
    comment: string = "";

    @JsonProperty("guiElement", String)
    guiElement: string = "";

    @JsonProperty("guiOrder", String)
    guiOrder: string = "";

    @JsonProperty("guiAttributes", [String])
    guiAttributes: string[] = [];

    @JsonProperty("cardinality", String)
    cardinality: string = "";

    @JsonProperty("subPropOf", String)
    subPropOf: string = "";
}