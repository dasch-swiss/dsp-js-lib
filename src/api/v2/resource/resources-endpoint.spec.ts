import { of } from "rxjs";
import { ListNodeCache, OntologyCache } from "../../..";
import { MockList } from "../../../../test/data/api/v2/mockList";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ReadResource } from "../../../models/v2/resources/read-resource";

describe("ResourcesEndpoint", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, undefined, "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    const ontoCache = new OntologyCache(knoraApiConnection, config);
    const listNodeCache = new ListNodeCache(knoraApiConnection);

    let getResourceClassDefinitionFromCacheSpy: jasmine.Spy;
    let getListNodeFromCacheSpy: jasmine.Spy;

    beforeEach(() => {

        jasmine.Ajax.install();

        getResourceClassDefinitionFromCacheSpy = spyOn(ontoCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                return of(MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri));
            }
        );

        getListNodeFromCacheSpy = spyOn(listNodeCache, "getNode").and.callFake(
            (listNodeIri: string) => {
                const mock = MockList.mockNode(listNodeIri);

                return of(mock);
            }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("should return a resource", done => {

        knoraApiConnection.v2.res.getResource("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", ontoCache, listNodeCache).subscribe((response: ReadResource) => {

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

});
