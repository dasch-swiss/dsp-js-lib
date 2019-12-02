import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseFileValue } from "../type-specific-interfaces/base-file-value";
import { CreateValue } from "./create-value";

@JsonObject("CreateFileValue")
export abstract class CreateFileValue extends CreateValue implements IBaseFileValue {
    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";
}

@JsonObject("CreateStillImageFileValue")
export class CreateStillImageFileValue extends CreateFileValue {

    constructor() {
        super(Constants.StillImageFileValue);
    }

}
