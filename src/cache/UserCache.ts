import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { KnoraApiConnection } from "../knora-api-connection";
import { UserResponse } from "../models/admin/user-response";
import { ApiResponseData } from "../models/api-response-data";
import { GenericCache } from "./GenericCache";

/**
 * Caches user information obtained from Knora.
 */
export class UserCache extends GenericCache<UserResponse> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<UserResponse[]> {
        return this.knoraApiConnection.admin.usersEndpoint.getUser("username", key).pipe(
            map((response: ApiResponseData<UserResponse>) => {
                return [response.body];
            })
        );
    }

    protected getKeyOfItem(item: UserResponse): string {
        return item.user.username;
    }

    protected getDependenciesOfItem(item: UserResponse): string[] {
        return [];
    }

}
