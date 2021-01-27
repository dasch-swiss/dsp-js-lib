import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { StringLiteralToStringLiteralArrayConverter } from "../../custom-converters/string-literal-to-string-literal-array-converter";
import { StringLiteralV2 } from "../../string-literal-v2";
import { UpdateResourceClass } from "./update-resource-class";

/**
 * @category Model V2
 */
@JsonObject("UpdateResourceClassComment")
export class UpdateResourceClassComment extends UpdateResourceClass {

    @JsonProperty(Constants.Comment, StringLiteralToStringLiteralArrayConverter)
    comments: StringLiteralV2[] = [];

}
