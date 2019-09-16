import { of } from "rxjs";
import { OntologyCache } from "../../..";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ReadResource } from "../../../models/v2/resources/read-resource";

describe("SearchEndpoint", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, undefined, "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    const ontoCache = new OntologyCache(knoraApiConnection, config);

    let getResourceClassSpy: jasmine.Spy;

    beforeEach(() => {
        jasmine.Ajax.install();

        getResourceClassSpy = spyOn(ontoCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                return of(MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri));
            }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Fulltext search", () => {

        it("should do a fulltext search with a simple search term", done => {

            knoraApiConnection.v2.search.doFulltextSearch("thing", ontoCache, 0).subscribe((response: ReadResource[]) => {

                expect(response.length).toEqual(16);

                done();
            });

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://api.dasch.swiss/v2/search/thing?offset=0");

            expect(request.method).toEqual("GET");

        });

        it("should do a fulltext search with a simple search term using offset 1", done => {

            knoraApiConnection.v2.search.doFulltextSearch("thing", ontoCache, 1).subscribe((response: ReadResource[]) => {

                expect(response.length).toEqual(16);

                done();
            });

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://api.dasch.swiss/v2/search/thing?offset=1");

            expect(request.method).toEqual("GET");

        });

        it("should do a fulltext search with a simple search term restricting the search to a specific resource class", done => {

            knoraApiConnection.v2.search.doFulltextSearch("thing", ontoCache, 1, {limitToResourceClass: "http://api.dasch.swiss/ontology/0001/anything/v2#Thing"}).subscribe((response: ReadResource[]) => {

                expect(response.length).toEqual(16);

                done();
            });

            const request: JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url)
                .toEqual("http://api.dasch.swiss/v2/search/thing?offset=1&limitToResourceClass=http%3A%2F%2Fapi.dasch.swiss%2Fontology%2F0001%2Fanything%2Fv2%23Thing");

            expect(request.method).toEqual("GET");

        });

        it("should do a fulltext search with a simple search term restricting the search to a specific project", done => {

            knoraApiConnection.v2.search.doFulltextSearch("thing", ontoCache, 1, {limitToProject: "http://rdfh.ch/projects/0001"}).subscribe((response: ReadResource[]) => {

                expect(response.length).toEqual(16);

                done();
            });

            const request: JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url)
                .toEqual("http://api.dasch.swiss/v2/search/thing?offset=1&limitToProject=http%3A%2F%2Frdfh.ch%2Fprojects%2F0001");

            expect(request.method).toEqual("GET");

        });

        it("should do a fulltext search with a simple search term restricting the search to a specific standoff class", done => {

            knoraApiConnection.v2.search.doFulltextSearch("thing", ontoCache, 1, {limitToStandoffClass: "http://api.knora.org/ontology/standoff/v2#StandoffParagraphTag"}).subscribe((response: ReadResource[]) => {

                expect(response.length).toEqual(16);

                done();
            });

            const request: JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url)
                .toEqual("http://api.dasch.swiss/v2/search/thing?offset=1&limitToStandoffClass=http%3A%2F%2Fapi.knora.org%2Fontology%2Fstandoff%2Fv2%23StandoffParagraphTag");

            expect(request.method).toEqual("GET");

        });

    });

});
