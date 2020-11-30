import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseFileValue } from "../type-specific-interfaces/base-file-value";
import { CreateValue } from "./create-value";

/**
 * @category Model
 */
@JsonObject("CreateFileValue")
export abstract class CreateFileValue extends CreateValue implements IBaseFileValue {
    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";
}

/**
 * @category Model
 */
@JsonObject("CreateStillImageFileValue")
export class CreateStillImageFileValue extends CreateFileValue {

    constructor() {
        super(Constants.StillImageFileValue);
    }

}
