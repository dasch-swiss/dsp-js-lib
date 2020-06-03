import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "../../../admin/string-literal";

@JsonObject("CreateResourceClass")
export class CreateResourceClass {

    @JsonProperty("name", String)
    name: string = "";

    @JsonProperty("labels", [StringLiteral])
    labels: StringLiteral[] = [];

    @JsonProperty("comments", [StringLiteral])
    comments: StringLiteral[] = [];

    @JsonProperty("subClassOf", String)
    subClassOf: string = "";
}