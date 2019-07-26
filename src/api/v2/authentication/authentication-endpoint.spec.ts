import {KnoraApiConfig} from '../../../knora-api-config';
import {KnoraApiConnection} from '../../../knora-api-connection';
import {MockAjaxCall} from '../../../../test/mockajaxcall';
import {ApiResponseData, LoginResponse, LogoutResponse} from '../../..';

describe('Test class AuthenticationEndpoint', () => {

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it('should perform a login', done => {

        const config = new KnoraApiConfig('http', 'localhost', 3333);

        const knoraApiConnection = new KnoraApiConnection(config);

        knoraApiConnection.v2.auth.login('user', 'test').subscribe((response: ApiResponseData<LoginResponse>) => {

            expect(response.body.token).toEqual('testtoken');
            expect(knoraApiConnection.v2.jsonWebToken).toEqual('testtoken');

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({'token': 'testtoken'})));

        expect(request.url).toEqual('http://localhost:3333/v2/authentication');

        expect(request.method).toEqual('POST');

        expect(request.data()).toEqual({username: 'user', password: 'test'});

    });

    it('should perform a logout', done => {

        const config = new KnoraApiConfig('http', 'localhost', 3333);

        const knoraApiConnection = new KnoraApiConnection(config);

        knoraApiConnection.v2.auth.logout().subscribe((response: ApiResponseData<LogoutResponse>) => {

            expect(response.body.status).toEqual(0);
            expect(response.body.message).toEqual('Logout OK');
            expect(knoraApiConnection.v2.jsonWebToken).toEqual('');

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({"message":"Logout OK","status":0})));

        expect(request.url).toEqual('http://localhost:3333/v2/authentication');

        expect(request.method).toEqual('DELETE');

    });

});

