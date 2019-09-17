import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { ListNode } from "../lists/list-node";

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
