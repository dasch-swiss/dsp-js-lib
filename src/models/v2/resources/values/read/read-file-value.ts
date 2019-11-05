import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { UriConverter } from "../../../custom-converters/uri-converter";
import { IBaseFileValue } from "../type-specific-interfaces/base-file-value";
import { ReadValue } from "./read-value";

@JsonObject("ReadFileValue")
export abstract class ReadFileValue extends ReadValue {

    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";

    @JsonProperty(Constants.FileValueAsUrl, UriConverter)
    fileUrl: string = "";
}

@JsonObject("ReadStillImageFileValue")
export class ReadStillImageFileValue extends ReadFileValue implements IBaseFileValue {

    @JsonProperty(Constants.StillImageFileValueHasDimX, Number)
    dimX: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasDimY, Number)
    dimY: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasIIIFBaseUrl, UriConverter)
    iiifBaseUrl: string = "";

}
