import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AdminEndpoint } from "../api/admin/admin-endpoint";
import { ListResponse } from "../models/admin/list-response";
import { ApiResponseData } from "../models/api-response-data";
import { ApiResponseError } from "../models/api-response-error";
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

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<ListResponse[] | ApiResponseError> {
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
