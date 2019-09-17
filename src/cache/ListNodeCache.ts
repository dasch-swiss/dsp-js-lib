import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { KnoraApiConnection } from "../knora-api-connection";
import { ListConversionUtil } from "../models/v2/lists/list-conversion-util";
import { ListNode } from "../models/v2/lists/list-node";
import { GenericCache } from "./GenericCache";

export class ListNodeCache extends GenericCache<ListNode> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    /**
     * Given a list node IRI, gets it from the cache.
     *
     * The root node of a list should not be requested using this method.
     * This should be left to dependency handling to optimize caching.
     *
     * @param nodeIri the IRI of the list node to be returned.
     */
    getNode(nodeIri: string) {
        return this.getItem(nodeIri);
    }

    protected getKeyOfItem(item: ListNode): string {
        return item.id;
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<ListNode[]> {
        if (!isDependency) {
            // not a dependency, get the list node
            return this.knoraApiConnection.v2.list.getNode(key)
                .pipe(map((node: ListNode) => [node]));
        } else {
            // a dependency, get the whole list
            const list = this.knoraApiConnection.v2.list.getList(key);

            return (list as Observable<ListNode>).pipe(
                map(
                    rootNode => {
                        // Transform the list into an array of all list nodes
                        const nodes: ListNode[] = ListConversionUtil.collectNodes(rootNode);

                        return nodes.map(
                            node => {
                                // Remove references to child nodes to make this consistent:
                                // node route does not return children, list route does
                                node.children = [];
                                return node;
                            }
                        );

                    }
                )
            );

        }
    }

    protected getDependenciesOfItem(item: ListNode): string[] {
        if (item.hasRootNode !== undefined) {
            // The whole list will be fetched as a dependency
            // of any given list node
            return [item.hasRootNode];
        } else {
            return [];
        }
    }

}
