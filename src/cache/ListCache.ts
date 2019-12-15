import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponseData } from "../models/api-response-data";
import { ListsEndpoint } from "../api/admin/lists/lists-endpoint";
import { FullListResponse } from "../models/admin/fulllist-response";
import { FullList, FullListNode, ListInfo } from "../models/admin/lists";
import { GenericCache } from "./GenericCache";

/**
 * Caches user information obtained from Knora.
 */
export class ListCache extends GenericCache<FullListResponse> {

    constructor(private listsEndpoint: ListsEndpoint) {
        super();
    }

    getFullList(listIri: string): Observable<FullList> {
        return this.getItem(listIri).pipe(
            map((res: FullListResponse) => res.list)
        );
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<FullListResponse[]> {
        return this.listsEndpoint.getFullList(key).pipe(
            map((response: ApiResponseData<FullListResponse>) => {
                return [response.body];
            })
        );
    }

    protected getKeyOfItem(item: FullListResponse): string {
        return item.list.listinfo.id;
    }

    protected getDependenciesOfItem(item: FullListResponse): string[] {
        return [];
    }

}
