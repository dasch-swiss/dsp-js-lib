import {KnoraApiConfig} from '../../../knora-api-config';
import {KnoraApiConnection} from '../../../knora-api-connection';
import {MockAjaxCall} from '../../../../test/mockajaxcall';
import {subscribeOn} from 'rxjs/operators';
import {OntologyCache} from '../../..';
import {ReadResource} from '../../../models/v2/resources/read-resource';
import {of} from 'rxjs';
import {IEntityDefinitions} from '../../../cache/OntologyCache';
import {ResourceClassDefinition} from '../../../models/v2/ontologies/resource-class-definition';
import {PropertyDefinition} from '../../../models/v2/ontologies/property-definition';
import {ResourcePropertyDefinition} from '../../../models/v2/ontologies/resource-property-definition';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {PropertyMatchingRule} from 'json2typescript/src/json2typescript/json-convert-enums';
import {Constants} from '../../../models/v2/Constants';
import {SystemPropertyDefinition} from '../../../models/v2/ontologies/system-property-definition';

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
            // console.log(JSON.stringify(response));

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

const entityMock: IEntityDefinitions = {
    classes: {

    },
    properties: {

    }
};

const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT,
);

const anythingOntology = require('../../../../test/data/api/v2/ontologies/anything-ontology-expanded.json');
const knoraApiOntology = require('../../../../test/data/api/v2/ontologies/knora-api-ontology-expanded.json');

const knoraApiEntities = (knoraApiOntology as { [index: string]: object[] })['@graph'];
const anythingEntities = (anythingOntology as { [index: string]: object[] })['@graph'];

const entities = knoraApiEntities.concat(anythingEntities);

// this.jsonConvert.operationMode = OperationMode.LOGGING;

// Convert resource classes
entities.filter((entity: any) => {
    return entity.hasOwnProperty(Constants.IsResourceClass) &&
            entity[Constants.IsResourceClass] === true && entity['@id'] === "http://api.dasch.swiss/ontology/0001/anything/v2#Thing";
}).map(resclassJsonld => {
    return jsonConvert.deserializeObject(resclassJsonld, ResourceClassDefinition);
}).forEach((resClass: ResourceClassDefinition) => {
    entityMock.classes[resClass.id] = resClass;
});

// properties of anything Thing

const props: string[]
        = entityMock.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"].propertiesList.map(prop => prop.propertyIndex);

// Convert resource properties (properties pointing to Knora values)
entities.filter((entity: any) => {
    return entity.hasOwnProperty(Constants.IsResourceProperty) &&
            entity[Constants.IsResourceProperty] === true && props.indexOf(entity['@id']) !== -1;
}).map((propertyJsonld: any) => {
    return jsonConvert.deserializeObject(propertyJsonld, ResourcePropertyDefinition);
}).forEach((prop: ResourcePropertyDefinition) => {
    entityMock.properties[prop.id] = prop;
});

// Convert system properties (properties not pointing to Knora values)
entities.filter((entity: any) => {
    return (entity['@type'] === Constants.DataTypeProperty || entity['@type'] === Constants.ObjectProperty)
            && !entity.hasOwnProperty(Constants.IsResourceProperty) && props.indexOf(entity['@id']) !== -1;
}).map((propertyJsonld: any) => {
    return jsonConvert.deserializeObject(propertyJsonld, SystemPropertyDefinition);
}).forEach((prop: SystemPropertyDefinition) => {
    entityMock.properties[prop.id] = prop;
});
