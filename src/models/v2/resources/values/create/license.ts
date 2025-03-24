import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";

@JsonObject("License")
export class License {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.LabelEn, String)
    labelEn: string = "";

    @JsonProperty(Constants.Uri, String)
    uri: string = "";
}