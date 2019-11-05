import { JsonObject, JsonProperty } from "json2typescript";
import { Constants, CreateValue } from "../../../../..";
import { IBaseFileValue } from "../type-specific-interfaces/base-file-value";

@JsonObject("CreateStillImageFileValue")
export class CreateStillImageFileValue extends CreateValue implements IBaseFileValue {

    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";

    constructor() {
        super(Constants.StillImageFileValue);
    }

}
