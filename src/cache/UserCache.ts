import {GenericCache} from './GenericCache';
import {KnoraApiConnection} from '../knora-api-connection';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponseData, UserResponse} from '..';

export class UserCache extends GenericCache<UserResponse> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    protected requestItemFromKnora(key: string): Observable<UserResponse> {
        return this.knoraApiConnection.admin.users.getUser('iri', key).pipe(
                map((response: ApiResponseData<UserResponse>) => {
                    return response.body;
                })
        );
    }

    protected getDependenciesOfItem(item: UserResponse): string[] {
        return [];
    }

}
