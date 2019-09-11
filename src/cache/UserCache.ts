import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponseData, UserResponse } from "..";
import { KnoraApiConnection } from "../knora-api-connection";
import { GenericCache } from "./GenericCache";

export class UserCache extends GenericCache<UserResponse> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<UserResponse[]> {
        return this.knoraApiConnection.admin.usersEndpoint.getUser("iri", key).pipe(
            map((response: ApiResponseData<UserResponse>) => {
                return [response.body];
            })
        );
    }

    protected getDependenciesOfItem(item: UserResponse): string[] {
        return [];
    }

}
