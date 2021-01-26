import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { StringLiteralToStringLiteralArrayConverter } from "../../custom-converters/string-literal-to-string-literal-array-converter";
import { StringLiteralV2 } from "../../string-literal-v2";

/**
 * @category Model V2
 */
@JsonObject("UpdateResourceClassLabel")
export class UpdateResourceClassLabel {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string =  Constants.Class;

    @JsonProperty(Constants.Label, StringLiteralToStringLiteralArrayConverter)
    labels: StringLiteralV2[] = [];

}
