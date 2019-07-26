import {KnoraApiConfig} from '../knora-api-config';
import {Endpoint} from './endpoint';
import {MockAjaxCall} from '../../test/mockajaxcall';
import {AjaxResponse} from 'rxjs/ajax';

describe('Endpoint', () => {

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });


    it('should perform a get request', done => {

        const config = new KnoraApiConfig('http', 'localhost', 3333);

        const endpoint = new Endpoint(config, '/test');

        endpoint['httpGet']().subscribe(
                (response: AjaxResponse) => {
                    expect(response.status).toEqual(200);
                    expect(response.response).toEqual({test: 'test'});

                    done();
                });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: 'test'})));

        expect(request.url).toBe('http://localhost:3333/test');

        expect(request.method).toEqual('GET');

        expect(request.requestHeaders).toEqual({});

    });

    it('should perform a get request with authentication', done => {

        const config = new KnoraApiConfig('http', 'localhost', 3333);

        const endpoint = new Endpoint(config, '/test');

        endpoint.jsonWebToken = 'testtoken';

        endpoint['httpGet']().subscribe(
                (response: AjaxResponse) => {
                    expect(response.status).toEqual(200);
                    expect(response.response).toEqual({test: 'test'});

                    done();
                });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: 'test'})));

        expect(request.url).toBe('http://localhost:3333/test');

        expect(request.method).toEqual('GET');

        expect(request.requestHeaders).toEqual({Authorization: 'Bearer testtoken'});

    });

});
