import { ListNode } from "./list-node";

export namespace ListConversionUtil {

    /**
     * Given a list node, collects the node
     * and all of its direct and indirect children.
     *
     * @param node the node to start with.
     */
    export const collectNodes = (node: ListNode) => {

        // collection of nodes to add to
        let subnodes: ListNode[] = [];

        node.children.forEach(
            (child: ListNode) => {
                subnodes = subnodes.concat(collectNodes(child));
            }
        );

        return [node].concat(subnodes);

    };

}
