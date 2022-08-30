import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { UriConverter } from "../../../custom-converters/uri-converter";
import { IBaseFileValue } from "../type-specific-interfaces/base-file-value";
import { ReadValue } from "./read-value";

/**
 * @category Model V2
 */
@JsonObject("ReadFileValue")
export abstract class ReadFileValue extends ReadValue implements IBaseFileValue {

    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";

    @JsonProperty(Constants.FileValueAsUrl, UriConverter)
    fileUrl: string = "";
}

/**
 * @category Model V2
 */
@JsonObject("ReadAudioFileValue")
export class ReadAudioFileValue extends ReadFileValue {

    @JsonProperty(Constants.AudioFileValueHasDuration, Number, true)
    duration?: number = 0;

}

/**
 * @category Model V2
 */
@JsonObject("ReadDocumentFileValue")
export class ReadDocumentFileValue extends ReadFileValue {

    @JsonProperty(Constants.DocumentFileValueHasDimX, Number, true)
    dimX?: number = 0;

    @JsonProperty(Constants.DocumentFileValueHasDimY, Number, true)
    dimY?: number = 0;

    @JsonProperty(Constants.DocumentFileValueHasPageCount, Number, true)
    pageCount?: number = 0;

}

/**
 * @category Model V2
 */
@JsonObject("ReadMovingImageFileValue")
export class ReadMovingImageFileValue extends ReadFileValue {

    @JsonProperty(Constants.MovingImageFileValueHasDimX, Number, true)
    dimX?: number = 0;

    @JsonProperty(Constants.MovingImageFileValueHasDimY, Number, true)
    dimY?: number = 0;

    @JsonProperty(Constants.MovingImageFileValueHasDuration, Number, true)
    duration?: number = 0;

    @JsonProperty(Constants.MovingImageFileValueHasFps, Number, true)
    fps?: number = 0;

}

/**
 * @category Model V2
 */
@JsonObject("ReadStillImageFileValue")
export class ReadStillImageFileValue extends ReadFileValue {

    @JsonProperty(Constants.StillImageFileValueHasDimX, Number)
    dimX: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasDimY, Number)
    dimY: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasIIIFBaseUrl, UriConverter)
    iiifBaseUrl: string = "";

}

/**
 * @category Model V2
 */
@JsonObject("ReadArchiveFileValue")
export class ReadArchiveFileValue extends ReadFileValue {

}

/**
* @category Model V2
*/
@JsonObject("ReadTextFileValue")
export class ReadTextFileValue extends ReadFileValue {

}
