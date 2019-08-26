import {KnoraApiConfig} from '../../../knora-api-config';
import {KnoraApiConnection} from '../../../knora-api-connection';
import {MockAjaxCall} from '../../../../test/mockajaxcall';
import {subscribeOn} from 'rxjs/operators';

describe('ResourcesEndpoint', () => {

    const config = new KnoraApiConfig('http', 'api.dasch.swiss');
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {

        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it('should return a resource', done => {

        knoraApiConnection.v2.res.getResource('http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw').subscribe(response => {
            console.log(response);

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        const onto = require('../../../../test/data/api/v2/resources/testding.json');

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

        expect(request.url).toBe('http://api.dasch.swiss/v2/resources/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw');

        expect(request.method).toEqual('GET');

    });

});