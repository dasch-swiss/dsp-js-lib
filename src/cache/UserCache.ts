import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { KnoraApiConnection } from "../knora-api-connection";
import { UserResponse } from "../models/admin/user-response";
import { ApiResponseData } from "../models/api-response-data";
import { ApiResponseError } from "../models/api-response-error";
import { GenericCache } from "./GenericCache";

/**
 * Caches user information obtained from Knora.
 */
export class UserCache extends GenericCache<UserResponse> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    /**
     * Gets a user identified by its Iri.
     *
     * @param iri the Iri identifying the user.
     */
    getUser(iri: string): Observable<UserResponse> {
        return this.getItem(iri);
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<UserResponse[] | ApiResponseError> {
        return this.knoraApiConnection.admin.usersEndpoint.getUser("iri", key).pipe(
            map((response: ApiResponseData<UserResponse>) => {
                return [response.body];
            })
        );
    }

    protected getKeyOfItem(item: UserResponse): string {
        return item.user.id;
    }

    protected getDependenciesOfItem(item: UserResponse): string[] {
        return [];
    }

}
