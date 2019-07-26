import {KnoraApiConfig} from '../knora-api-config';
import {Endpoint} from './endpoint';
import {ApiResponseData} from '..';
import {MockAjaxCall} from '../../test/mockajaxcall';
import {AjaxResponse} from 'rxjs/ajax';


describe('Endpoint', () => {

    const config = new KnoraApiConfig('http', 'localhost', 3333);
    const endpoint = new Endpoint(config, '/test');

    beforeEach(() => {

        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe('Method httpGet', () => {

        it('should perform a get request', done => {

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

    });

});
