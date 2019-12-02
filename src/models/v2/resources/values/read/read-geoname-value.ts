import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseGeonameValue } from "../type-specific-interfaces/base-geoname-value";
import { ReadValue } from "./read-value";

@JsonObject("ReadGeonameValue")
export class ReadGeonameValue extends ReadValue implements IBaseGeonameValue {

    @JsonProperty(Constants.GeonameValueAsGeonameCode, String)
    geoname: string = "";
}
