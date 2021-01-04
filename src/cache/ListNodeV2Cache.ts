import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { V2Endpoint } from "../api/v2/v2-endpoint";
import { ListConversionUtil } from "../models/v2/lists/list-conversion-util";
import { ListNodeV2 } from "../models/v2/lists/list-node-v2";
import { GenericCache } from "./GenericCache";

/**
 * Caches list nodes obtained from Knora.
 * As an optimization, the whole list is requested and cached (all of its nodes) once a list node has been rquested.
 */
export class ListNodeV2Cache extends GenericCache<ListNodeV2> {

    constructor(private v2Endpoint: V2Endpoint) {
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
        return this.getItem(nodeIri).pipe(
            tap((res: ListNodeV2) => {
                const deps = this.getDependenciesOfItem(res);
                deps.forEach(depKey =>  {
                    // subscribe to dependencies so the Observable starts emitting
                    this.getItem(depKey).subscribe();
                });
            })
        );
    }

    protected getKeyOfItem(item: ListNodeV2): string {
        return item.id;
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<ListNodeV2[]> {
        if (!isDependency) {
            // not a dependency, get the list node
            return this.v2Endpoint.list.getNode(key)
                .pipe(map((node: ListNodeV2) => [node]));
        } else {
            // a dependency, get the whole list
            const list = this.v2Endpoint.list.getList(key);

            return (list as Observable<ListNodeV2>).pipe(
                map(
                    rootNode => {
                        // Transform the list into an array of all list nodes
                        const nodes: ListNodeV2[] = ListConversionUtil.collectNodes(rootNode);

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

    protected getDependenciesOfItem(item: ListNodeV2): string[] {
        if (item.hasRootNode !== undefined) {
            // The whole list will be fetched as a dependency
            // of any given list node
            return [item.hasRootNode];
        } else {
            return [];
        }
    }

}
