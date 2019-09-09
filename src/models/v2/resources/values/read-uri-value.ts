import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { UriConverter } from "../../custom-converters/CustomConverters";
import { ReadValue } from "./read-value";

@JsonObject("ReadUriValue")
export class ReadUriValue extends ReadValue {

    @JsonProperty(Constants.UriValueAsUri, UriConverter)
    uri: string = "";
}
