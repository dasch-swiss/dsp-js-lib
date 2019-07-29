import {UsersResponse} from '../models/admin/users-response';
import {GenericCache} from './GenericCache';
import {KnoraApiConnection} from '../knora-api-connection';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponseData} from '..';

export class UsersCache extends GenericCache<UsersResponse> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    protected requestItemFromKnora(key: string): Observable<UsersResponse> {
        return this.knoraApiConnection.admin.users.getUsers().pipe(
                map((response: ApiResponseData<UsersResponse>) => {
                    return response.body;
                })
        );
    }

}
