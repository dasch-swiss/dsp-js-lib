import {KnoraApiConfig} from '../knora-api-config';
import {KnoraApiConnection} from '../knora-api-connection';
import {UsersCache} from './UsersCache';
import {UsersResponse} from '../models/admin/users-response';
import {ApiResponseData} from '..';
import {of} from 'rxjs';

describe('UsersCache', () => {

    const config = new KnoraApiConfig('http', 'localhost', 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    describe('Method getItem', () => {

        it('should get Users from the cache', () => {

            const spy: jasmine.Spy = spyOn(knoraApiConnection.admin.users, 'getUsers').and.callFake(
                    () => {
                        return of({body: 1});
                    }
            );

            const users = new UsersCache(knoraApiConnection);

            users.getItem('a').subscribe((res: UsersResponse | null) => {
                console.log(res);
                expect(spy).toHaveBeenCalledTimes(1);
            });

            users.getItem('a').subscribe((res: UsersResponse | null) => {
                console.log(res);
                expect(spy).toHaveBeenCalledTimes(1);
            });

            users.getItem('a').subscribe((res: UsersResponse | null) => {
                console.log(res);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });

    });

});
