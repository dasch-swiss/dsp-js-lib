import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ListNode } from "../models/v2/lists/list-node";
import { GenericCache } from "./GenericCache";

export class ListNodeCache extends GenericCache<ListNode> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    getNode(nodeIri: string) {
        return this.getItem(nodeIri);
    }

    protected getKeyOfItem(item: ListNode): string {
        return item.id;
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<ListNode[]> {
        if (!isDependency) {
            return this.knoraApiConnection.v2.list.getNode(key)
                .pipe(map((node: ListNode) => [node]));
        } else {
            const list = this.knoraApiConnection.v2.list.getList(key);

            const collectNodes = (node: ListNode) => {

                let subnodes: ListNode[] = [];

                node.children.forEach(
                    child => subnodes = subnodes.concat(collectNodes(child))
                );

                return [node].concat(subnodes);

            };

            return (list as Observable<ListNode>).pipe(
                map(
                    rootNode => collectNodes(rootNode)
                )
            );

        }
    }

    protected getDependenciesOfItem(item: ListNode): string[] {
        if (item.hasRootNode !== undefined) {
            return [item.hasRootNode];
        } else {
            return [];
        }
    }

}
