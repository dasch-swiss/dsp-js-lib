import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseFileValue } from "../type-specific-interfaces/base-file-value";
import { UpdateValue } from "./update-value";

/**
 * @category Model V2
 */
@JsonObject("UpdateFileValue")
export abstract class UpdateFileValue extends UpdateValue implements IBaseFileValue {

    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";

}

/**
 * @category Model V2
 */
@JsonObject("UpdateAudioFileValue")
export class UpdateAudioFileValue extends UpdateFileValue {

    constructor() {
        super(Constants.AudioFileValue);
    }

}

/**
 * @category Model V2
 */
@JsonObject("UpdateDocumentFileValue")
export class UpdateDocumentFileValue extends UpdateFileValue {

    constructor() {
        super(Constants.DocumentFileValue);
    }

}

/**
 * @category Model V2
 */
@JsonObject("UpdateMovingImageFileValue")
export class UpdateMovingImageFileValue extends UpdateFileValue {

    constructor() {
        super(Constants.MovingImageFileValue);
    }

}

/**
 * @category Model V2
 */
@JsonObject("UpdateStillImageFileValue")
export class UpdateStillImageFileValue extends UpdateFileValue {

    constructor() {
        super(Constants.StillImageFileValue);
    }

}

/**
 * @category Model V2
 */
@JsonObject("UpdateStillImageExternalFileValue")
export class UpdateExternalStillImageFileValue extends UpdateFileValue {

    constructor() {
        super(Constants.StillImageExternalFileValue);
    }

}


/**
 * @category Model V2
 */
@JsonObject("UpdateTextFileValue")
export class UpdateTextFileValue extends UpdateFileValue {

    constructor() {
        super(Constants.TextFileValue);
    }

}

/**
 * @category Model V2
 */
 @JsonObject("UpdateArchiveFileValue")
 export class UpdateArchiveFileValue extends UpdateFileValue {

     constructor() {
         super(Constants.ArchiveFileValue);
     }

 }
