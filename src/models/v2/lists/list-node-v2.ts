import {
    JsonConvert,
    JsonConverter,
    JsonCustomConvert,
    JsonObject,
    JsonProperty,
    OperationMode,
    ValueCheckingMode
} from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";

@JsonConverter
export class SubListNodeConverter implements JsonCustomConvert<ListNodeV2[]> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(subclasses: ListNodeV2[]): any {
    }

    deserialize(subnodes: any): ListNodeV2[] {

        let children: object[];

        if (Array.isArray(subnodes)) {
            children = subnodes;
        } else {
            children = [subnodes];
        }

        return children
            .map(
                child =>
                    SubListNodeConverter.jsonConvert.deserialize(child, ListNodeV2) as ListNodeV2);
    }
}

@JsonObject("ListNode")
export class ListNodeV2 {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.IsRootNode, Boolean, true)
    isRootNode: boolean = false;

    @JsonProperty(Constants.HasRootNode, IdConverter, true)
    hasRootNode?: string = undefined;

    @JsonProperty(Constants.HasSubListNode, SubListNodeConverter, true)
    children: ListNodeV2[] = [];
}
