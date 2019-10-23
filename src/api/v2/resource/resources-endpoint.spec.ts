import { of } from "rxjs";
import { MockList } from "../../../../test/data/api/v2/mockList";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ReadResource } from "../../../models/v2/resources/read-resource";

describe("ResourcesEndpoint", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, undefined, "", true);
    let knoraApiConnection: KnoraApiConnection;

    let getResourceClassDefinitionFromCacheSpy: jasmine.Spy;
    let getListNodeFromCacheSpy: jasmine.Spy;

    beforeEach(() => {

        jasmine.Ajax.install();

        knoraApiConnection = new KnoraApiConnection(config);

        getResourceClassDefinitionFromCacheSpy = spyOn(knoraApiConnection.v2.ontologyCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                return of(MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri));
            }
        );

        getListNodeFromCacheSpy = spyOn(knoraApiConnection.v2.listNodeCache, "getNode").and.callFake(
            (listNodeIri: string) => {
                return MockList.mockCompletedAsyncSubject(listNodeIri);
            }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("should return a resource", done => {

        knoraApiConnection.v2.res.getResource("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw").subscribe((response: ReadResource) => {

            expect(response.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw");
            expect(response.resourceClassLabel).toEqual("Thing");

            expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(2);
            expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        const resource = require("../../../../test/data/api/v2/resources/testding.json");

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

        expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw");

        expect(request.method).toEqual("GET");

    });

    it("should return several resource", done => {

        knoraApiConnection.v2.res.getResources(["http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "http://rdfh.ch/0001/uqmMo72OQ2K2xe7mkIytlg"]).subscribe((response: ReadResource[]) => {

            expect(response.length).toEqual(2);

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        const resource = require("../../../../test/data/api/v2/resources/things.json");

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

        expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/http%3A%2F%2Frdfh.ch%2F0001%2FuqmMo72OQ2K2xe7mkIytlg");

        expect(request.method).toEqual("GET");

    });

});
