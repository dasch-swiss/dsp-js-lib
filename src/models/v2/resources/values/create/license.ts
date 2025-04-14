import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";

@JsonObject("License")
export class License {

    @JsonProperty("@id", String)
    id: string = "";
}