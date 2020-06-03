import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("CreateOntology")
export class CreateOntology {

    @JsonProperty("projectIri", String)
    projectIri: string = "";

    @JsonProperty("label", String)
    label: string = "";

    @JsonProperty("name", String)
    name: string = "";

}
