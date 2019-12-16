import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "..";
import { AdminEndpoint } from "../api/admin/admin-endpoint";
import { ApiResponseData } from "../models/api-response-data";
import { GenericCache } from "./GenericCache";

/**
 * Caches user information obtained from Knora.
 */
export class ListAdminCache extends GenericCache<ListResponse> {

    constructor(private adminEndpoint: AdminEndpoint) {
        super();
    }

    /**
     * Requests a whole list from the admin API.
     *
     * @param listIri IRI of the list.
     */
    getList(listIri: string) {
        return this.getItem(listIri);
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<ListResponse[]> {
        return this.adminEndpoint.listsEndpoint.getList(key).pipe(
            map((response: ApiResponseData<ListResponse>) => {
                return [response.body];
            })
        );
    }

    protected getKeyOfItem(item: ListResponse): string {
        return item.list.listinfo.id;
    }

    protected getDependenciesOfItem(item: ListResponse): string[] {
        return [];
    }

}
