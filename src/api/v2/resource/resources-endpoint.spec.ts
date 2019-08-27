import {KnoraApiConfig} from '../../../knora-api-config';
import {KnoraApiConnection} from '../../../knora-api-connection';
import {MockAjaxCall} from '../../../../test/mockajaxcall';
import {subscribeOn} from 'rxjs/operators';
import {OntologyCache} from '../../..';
import {ReadResource} from '../../../models/v2/resources/read-resource';
import {of} from 'rxjs';
import {IEntityDefinitions} from '../../../cache/OntologyCache';
import {ResourceClassDefinition} from '../../../models/v2/ontologies/resource-class-definition';

describe('ResourcesEndpoint', () => {

    const config = new KnoraApiConfig('http', 'api.dasch.swiss');
    const knoraApiConnection = new KnoraApiConnection(config);

    const ontoCache = new OntologyCache(knoraApiConnection);

    let getResourceClassSpy: jasmine.Spy;

    beforeEach(() => {

        jasmine.Ajax.install();

        getResourceClassSpy = spyOn(ontoCache, 'getResourceClass').and.callFake(
                (resClassIri: string) => {
                    return of(entityMock);
                }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it('should return a resource', done => {

        knoraApiConnection.v2.res.getResource('http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw', ontoCache).subscribe((response: ReadResource[]) => {
            expect(response.length).toEqual(1);
            expect(response[0].resClassLabel).toEqual('Thing');

            expect(getResourceClassSpy).toHaveBeenCalledTimes(1);
            expect(getResourceClassSpy).toHaveBeenCalledWith('http://api.dasch.swiss/ontology/0001/anything/v2#Thing');


            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        const onto = require('../../../../test/data/api/v2/resources/testding.json');

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

        expect(request.url).toBe('http://api.dasch.swiss/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw');

        expect(request.method).toEqual('GET');

    });

});

const anythingThing = new ResourceClassDefinition();
anythingThing.label = 'Thing';

const entityMock: IEntityDefinitions = {
    classes: {
        "http://api.dasch.swiss/ontology/0001/anything/v2#Thing": anythingThing
    },
    properties: {}
};
