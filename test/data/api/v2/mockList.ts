import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { ListConversionUtil } from "../../../../src/models/v2/lists/list-conversion-util";
import { ListNode } from "../../../../src/models/v2/lists/list-node";
import treeListExpanded from "../v2/lists/treelist-expanded.json";
import othertreeListExpanded from  "../v2/lists/othertreelist-expanded.json";

export namespace MockList {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const mockListNode = (listNodeIri: string): ListNode => {

        const treeList = jsonConvert.deserialize(treeListExpanded, ListNode) as ListNode;

        const otherTreeList = jsonConvert.deserialize(othertreeListExpanded, ListNode) as ListNode;

        const combinedNodes = ListConversionUtil.collectNodes(treeList).concat(ListConversionUtil.collectNodes(otherTreeList));

        return combinedNodes.filter(
            listNode => {
                return listNode.id === listNodeIri;
            }
        )[0];

    };

}
