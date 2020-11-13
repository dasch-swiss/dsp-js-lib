import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("UpdateProjectMetadataResponse")
export class UpdateProjectMetadataResponse {

    @JsonProperty("http://api.knora.org/ontology/knora-api/v2#result", String)
    result: string = "";
}
