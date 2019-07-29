import {KnoraApiConfig} from '../knora-api-config';
import {KnoraApiConnection} from '../knora-api-connection';
import {UserCache} from './UserCache';
import {UserResponse} from '..';
import {of} from 'rxjs';

describe('UserCache', () => {

    const config = new KnoraApiConfig('http', 'localhost', 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    describe('Method getItem', () => {

        it('should get a user from the cache', () => {

            const user = require('../../test/data/api/admin/user/get.json');

            const getUserSpy: jasmine.Spy = spyOn(knoraApiConnection.admin.users, 'getUser').and.callFake(
                    (prop: string, userId: string) => {

                        // console.log(prop, userId);

                        const userResp = new UserResponse();
                        userResp.user = user;

                        return of({ body: userResp });
                    }
            );

            const users = new UserCache(knoraApiConnection);

            users.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse | null) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            users.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse | null) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            users.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse | null) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            expect(getUserSpy).toHaveBeenCalledTimes(1);
            expect(getUserSpy).toHaveBeenCalledWith('iri', 'http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q');

        });

    });

});
