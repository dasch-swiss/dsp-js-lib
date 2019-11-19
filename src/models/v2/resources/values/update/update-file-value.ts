import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseFileValue } from "../type-specific-interfaces/base-file-value";
import { UpdateValue } from "./update-value";

@JsonObject("UpdateFileValue")
export abstract class UpdateFileValue extends UpdateValue implements IBaseFileValue {

    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";

    constructor() {
        super(Constants.StillImageFileValue);
    }
}

@JsonObject("UpdateStillImageFileValue")
export class UpdateStillImageFileValue extends UpdateFileValue {
}
