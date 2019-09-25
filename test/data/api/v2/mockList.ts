import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { AsyncSubject } from "rxjs";
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

    export const mockCompletedAsyncSubject = (listNodeIri: string): AsyncSubject<ListNode> => {

        const mock: ListNode = mockNode(listNodeIri);

        const sub = new AsyncSubject<ListNode>();
        sub.next(mock);
        sub.complete();

        return sub;

    };

    export const mockNode = (listNodeIri: string): ListNode => {

        const treeList = mockList("http://rdfh.ch/lists/0001/treeList");

        const otherTreeList = mockList("http://rdfh.ch/lists/0001/otherTreeList");

        const combinedNodes = ListConversionUtil.collectNodes(treeList).concat(ListConversionUtil.collectNodes(otherTreeList));

        const mockedNode =  combinedNodes.filter(
            listNode => {
                return listNode.id === listNodeIri;
            }
        );

        if (mockedNode.length !== 1) throw new Error("Node not found in mocked list");

        return mockedNode[0];

    };

    export const mockList = (listNodeIri: string): ListNode => {

        if (listNodeIri === "http://rdfh.ch/lists/0001/treeList") {
            return jsonConvert.deserialize(treeListExpanded, ListNode) as ListNode;
        } else if (listNodeIri === "http://rdfh.ch/lists/0001/otherTreeList") {
            return jsonConvert.deserialize(othertreeListExpanded, ListNode) as ListNode;
        } else {
            throw new Error("Mock data file not found");
        }

    };

}
