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
import { StringLiteral } from "../../admin/string-literal";

@JsonConverter
export class SubListNodeConverter implements JsonCustomConvert<ListNode[]> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(subclasses: ListNode[]): any {
    }

    deserialize(subnodes: any): ListNode[] {

        let children: object[];

        if (Array.isArray(subnodes)) {
            children = subnodes;
        } else {
            children = [subnodes];
        }

        return children
            .map(
                child =>
                    SubListNodeConverter.jsonConvert.deserialize(child, ListNode) as ListNode);
    }
}

@JsonObject("ListNode")
export class ListNode {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.IsRootNode, Boolean, true)
    isRootNode: boolean = false;

    @JsonProperty(Constants.HasRootNode, IdConverter, true)
    hasRootNode?: string = undefined;

    @JsonProperty(Constants.HasSubListNode, SubListNodeConverter, true)
    children: ListNode[] = [];
}

