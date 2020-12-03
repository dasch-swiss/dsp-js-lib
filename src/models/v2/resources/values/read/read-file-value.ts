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
@JsonObject("ReadStillImageFileValue")
export class ReadStillImageFileValue extends ReadFileValue {

    @JsonProperty(Constants.StillImageFileValueHasDimX, Number)
    dimX: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasDimY, Number)
    dimY: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasIIIFBaseUrl, UriConverter)
    iiifBaseUrl: string = "";

}
