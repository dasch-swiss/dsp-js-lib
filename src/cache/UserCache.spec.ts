import {KnoraApiConfig} from '../knora-api-config';
import {KnoraApiConnection} from '../knora-api-connection';
import {UserCache} from './UserCache';
import {UserResponse} from '..';
import {of} from 'rxjs';

describe('UserCache', () => {

    const config = new KnoraApiConfig('http', 'localhost', 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    describe('Method getItem', () => {

        let getUserSpy: jasmine.Spy;
        let userCache: UserCache;

        beforeEach(() => {

            const user = require('../../test/data/api/admin/user/get.json');

            getUserSpy = spyOn(knoraApiConnection.admin.users, 'getUser').and.callFake(
                    (prop: string, userId: string) => {

                        const userResp = new UserResponse();
                        userResp.user = user;

                        return of({body: userResp});
                    }
            );

            userCache = new UserCache(knoraApiConnection);

        });

        it('should get a user from the cache', done => {

            userCache.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse) => {
                expect(res.user.id).toEqual('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q');
                expect(getUserSpy).toHaveBeenCalledTimes(1);
                done();

            });
        });

        it('should get the user from the cache twice synchronously', done => {

            userCache.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse) => {
                expect(res.user.id).toEqual('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q');
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                userCache.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res2: UserResponse) => {
                    expect(res2.user.id).toEqual('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q');
                    expect(getUserSpy).toHaveBeenCalledTimes(1);
                    done();
                });
            });
        });

        it('should get the same user from the cache several times asynchronously', () => {

            userCache.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            userCache.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            userCache.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            expect(getUserSpy).toHaveBeenCalledTimes(1);
            expect(getUserSpy).toHaveBeenCalledWith('iri', 'http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q');

        });

        it('should get a user from the cache and refresh the entry', done => {

            userCache.getItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                userCache.reloadItem('http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe((res2: UserResponse) => {
                    expect(getUserSpy).toHaveBeenCalledTimes(2);
                    done();
                });
            });

        });

    });

});
