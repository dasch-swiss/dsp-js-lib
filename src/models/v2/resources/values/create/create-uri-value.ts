import { JsonObject, JsonProperty } from "json2typescript";
import { Constants, CreateValue, UpdateValue } from "../../../../..";
import { UriConverter } from "../../../custom-converters/uri-converter";
import { IBaseUriValue } from "../type-specific-interfaces/base-uri-value";

@JsonObject("CreateUriValue")
export class CreateUriValue extends CreateValue implements IBaseUriValue {

    @JsonProperty(Constants.UriValueAsUri, UriConverter)
    uri: string = "";

    constructor() {
        super(Constants.UriValue);
    }

}
