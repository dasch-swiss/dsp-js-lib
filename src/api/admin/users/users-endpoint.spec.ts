import {KnoraApiConfig} from '../../../knora-api-config';
import {KnoraApiConnection} from '../../../knora-api-connection';
import {UsersResponse} from '../../../models/admin/users-response';
import {ApiResponseData} from '../../../models/api-response-data';
import {MockAjaxCall} from '../../../../test/mockajaxcall';
import {UserResponse} from '../../..';

describe('UsersEndpoint', () => {

    const config = new KnoraApiConfig('http', 'localhost', 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {

        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe('Method getUsers', () => {

        it('should return all users', done => {

            knoraApiConnection.admin.users.getUsers().subscribe(
                    (response: ApiResponseData<UsersResponse>) => {
                        expect(response.body.users.length).toEqual(18);
                        expect(response.body.users[0].familyName).toEqual('Admin-alt');

                        done();
                    });

            const request = jasmine.Ajax.requests.mostRecent();

            const users = require('../../../../test/data/api/admin/users/get-users-response.json');

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(users)));

            expect(request.url).toBe('http://localhost:3333/admin/users');

            expect(request.method).toEqual('GET');

        });

    });

    describe('Method getUser', () => {

        it('should return a user by its iri', done => {

            knoraApiConnection.admin.users.getUser('iri', 'http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q').subscribe(
                    (response: ApiResponseData<UserResponse>) => {
                        expect(response.body.user.familyName).toEqual('User01');

                        done();
                    });

            const request = jasmine.Ajax.requests.mostRecent();

            const user = require('../../../../test/data/api/admin/users/get-user-response.json');

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(user)));

            expect(request.url).toBe('http://localhost:3333/admin/users/iri/http%3A%2F%2Frdfh.ch%2Fusers%2F9XBCrDV3SRa7kS1WwynB4Q');

            expect(request.method).toEqual('GET');

        });

        it('should return a user by its email', done => {

            knoraApiConnection.admin.users.getUser('email', 'anything.user01@example.org').subscribe(
                    (response: ApiResponseData<UserResponse>) => {
                        expect(response.body.user.familyName).toEqual('User01');

                        done();
                    });

            const request = jasmine.Ajax.requests.mostRecent();

            const user = require('../../../../test/data/api/admin/users/get-user-response.json');

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(user)));

            expect(request.url).toBe('http://localhost:3333/admin/users/email/anything.user01%40example.org');

            expect(request.method).toEqual('GET');

        });

        it('should return a user by its username', done => {

            knoraApiConnection.admin.users.getUser('username', 'anything.user01').subscribe(
                    (response: ApiResponseData<UserResponse>) => {
                        expect(response.body.user.familyName).toEqual('User01');

                        done();
                    });

            const request = jasmine.Ajax.requests.mostRecent();

            const user = require('../../../../test/data/api/admin/users/get-user-response.json');

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(user)));

            expect(request.url).toBe('http://localhost:3333/admin/users/username/anything.user01');

            expect(request.method).toEqual('GET');

        });

    });



});
