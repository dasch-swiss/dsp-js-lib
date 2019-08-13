import {ApiResponseData} from "../../..";
import {KnoraApiConfig} from '../../../knora-api-config';
import {KnoraApiConnection} from '../../../knora-api-connection';
import {MockAjaxCall} from '../../../../test/mockajaxcall';
import {UsersResponse} from "../../../models/admin/users-response";
import {OntologyV2} from "../../../models/v2/ontologies/ontology-v2";
import {ResourceClass} from '../../../models/v2/ontologies/resource-class';
import {SystemPropertyClass} from '../../../models/v2/ontologies/property-class';

describe('OntologiesEndpoint', () => {

    const config = new KnoraApiConfig('http', 'localhost', 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {

        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getOntology", () => {

        it("should return an ontology", done => {

            knoraApiConnection.v2.onto.getOntology("http://api.knora.org/ontology/knora-api/v2").subscribe(
                (response: OntologyV2) => {
                    expect(response.id).toEqual("http://api.knora.org/ontology/knora-api/v2");

                    expect(response.classes["http://api.knora.org/ontology/knora-api/v2#Annotation"] instanceof ResourceClass).toBeTruthy();
                    expect(response.classes["http://api.knora.org/ontology/knora-api/v2#Annotation"].id).toEqual("http://api.knora.org/ontology/knora-api/v2#Annotation");
                    expect(response.classes["http://api.knora.org/ontology/knora-api/v2#Annotation"].label).toEqual("Annotation");

                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#arkUrl"] instanceof SystemPropertyClass).toBeTruthy();
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#arkUrl"].id).toEqual("http://api.knora.org/ontology/knora-api/v2#arkUrl");
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#arkUrl"].label).toEqual("ARK URL");


                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require('../../../../test/data/api/v2/ontologies/knora-api-ontology.json');

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe('http://localhost:3333/v2/ontologies/allentities/http%3A%2F%2Fapi.knora.org%2Fontology%2Fknora-api%2Fv2');

            expect(request.method).toEqual('GET');

        });

        it("should return a project ontology", done => {

            knoraApiConnection.v2.onto.getOntology("http://api.dasch.swiss/ontology/0807/mls/v2").subscribe(
                (response: OntologyV2) => {
                    expect(response.id).toEqual("http://api.dasch.swiss/ontology/0807/mls/v2");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require('../../../../test/data/api/v2/ontologies/mls-ontology.json');

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe('http://localhost:3333/v2/ontologies/allentities/http%3A%2F%2Fapi.dasch.swiss%2Fontology%2F0807%2Fmls%2Fv2');

            expect(request.method).toEqual('GET');

        });

    });

});
