import { AjaxResponse } from "rxjs/ajax";
import { MockAjaxCall } from "../../test/mockajaxcall";
import { KnoraApiConfig } from "../knora-api-config";
import { Endpoint } from "./endpoint";

describe("Test class Endpoint", () => {

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("should perform a GET request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpGet"]().subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("GET");

        expect(request.requestHeaders).toEqual({"x-requested-with": "XMLHttpRequest"});

    });

    it("should perform an unsuccessful GET request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpGet"]().subscribe(
            (response) => {
            },
            err => {
                expect(err instanceof Error).toBeTruthy();
                expect(err.status).toEqual(404);
                done();
            });

        const request: JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockNotFoundResponse(JSON.stringify({msg: "Not Found"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("GET");

        expect(request.requestHeaders).toEqual({"x-requested-with": "XMLHttpRequest"});

    });

    it("should perform a GET request providing a path segment", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpGet"]("/mypath").subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test/mypath");

        expect(request.method).toEqual("GET");

        expect(request.requestHeaders).toEqual({"x-requested-with": "XMLHttpRequest"});

    });

    it("should perform a GET request with authentication", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint.jsonWebToken = "testtoken";

        endpoint["httpGet"]().subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("GET");

        expect(request.requestHeaders).toEqual({"authorization": "Bearer testtoken", "x-requested-with": "XMLHttpRequest"});

    });

    it("should perform a GET request with optional header options", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpGet"](undefined, {"my-feature-toggle": "my-awesome-feature"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("GET");

        expect(request.requestHeaders).toEqual({"my-feature-toggle": "my-awesome-feature", "x-requested-with": "XMLHttpRequest"});

    });

    it("should perform a POST request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPost"]("", {mydata: "data"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("POST");

        expect(request.requestHeaders).toEqual({"content-type": "application/json; charset=utf-8", "x-requested-with": "XMLHttpRequest"});

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform an unsuccessful POST request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPost"]("", {mydata: "data"}).subscribe(
            (response) => {

            },
            err => {
                expect(err instanceof Error).toBeTruthy();
                expect(err.status).toEqual(404);
                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockNotFoundResponse(JSON.stringify({msg: "Not Found"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("POST");

        expect(request.requestHeaders).toEqual({"content-type": "application/json; charset=utf-8", "x-requested-with": "XMLHttpRequest"});

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a POST request providing a path segment", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPost"]("/mypath", {mydata: "data"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test/mypath");

        expect(request.method).toEqual("POST");

        expect(request.requestHeaders).toEqual({"content-type": "application/json; charset=utf-8", "x-requested-with": "XMLHttpRequest"});

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a POST request with authentication", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint.jsonWebToken = "testtoken";

        endpoint["httpPost"]("", {mydata: "data"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("POST");

        expect(request.requestHeaders).toEqual({
            "authorization": "Bearer testtoken",
            "content-type": "application/json; charset=utf-8",
            "x-requested-with": "XMLHttpRequest"
        });

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a POST request with default JSON content-type and optional header options", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPost"](undefined, {mydata: "data"}, undefined, {"my-feature-toggle": "my-awesome-feature"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("POST");

        expect(request.requestHeaders).toEqual({
            "content-type": "application/json; charset=utf-8",
            "my-feature-toggle": "my-awesome-feature",
            "x-requested-with": "XMLHttpRequest"
        });

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a POST request with SPARQL content-type and additional header options", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        const gravsearchQuery = `
                PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
                CONSTRUCT {

                    ?mainRes knora-api:isMainResource true .

                } WHERE {

                    ?mainRes a knora-api:Resource .

                    ?mainRes a <http://0.0.0.0:3333/ontology/0001/anything/v2#Thing> .
                }

                OFFSET 0
            `;

        endpoint["httpPost"](undefined, gravsearchQuery, "sparql", {"my-feature-toggle": "my-awesome-feature"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("POST");

        expect(request.requestHeaders).toEqual({
            "content-type": "application/sparql-query; charset=utf-8",
            "my-feature-toggle": "my-awesome-feature",
            "x-requested-with": "XMLHttpRequest"
        });

        // https://github.com/jasmine/jasmine-ajax#5-inspect-ajax-requests
        // just check for the params because data() cannot handle this case
        expect(request.params).toEqual(gravsearchQuery);

    });

    it("should perform a PUT request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPut"]("", {mydata: "data"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("PUT");

        expect(request.requestHeaders).toEqual({"content-type": "application/json; charset=utf-8", "x-requested-with": "XMLHttpRequest"});

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform an an unsuccessful PUT request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPut"]("", {mydata: "data"}).subscribe(
            (response) => {
            },
            err => {
                expect(err instanceof Error).toBeTruthy();
                expect(err.status).toEqual(404);
                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockNotFoundResponse(JSON.stringify({msg: "Not Found"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("PUT");

        expect(request.requestHeaders).toEqual({"content-type": "application/json; charset=utf-8", "x-requested-with": "XMLHttpRequest"});

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a PUT request providing a path segment", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPut"]("/mypath", {mydata: "data"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test/mypath");

        expect(request.method).toEqual("PUT");

        expect(request.requestHeaders).toEqual({"content-type": "application/json; charset=utf-8", "x-requested-with": "XMLHttpRequest"});

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a PUT request with authentication", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint.jsonWebToken = "testtoken";

        endpoint["httpPut"]("/mypath", {mydata: "data"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test/mypath");

        expect(request.method).toEqual("PUT");

        expect(request.requestHeaders).toEqual({
            "authorization": "Bearer testtoken",
            "content-type": "application/json; charset=utf-8",
            "x-requested-with": "XMLHttpRequest"
        });

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a PUT request with default content-type and additional header options", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpPut"](undefined, {mydata: "data"}, undefined, {"my-feature-toggle": "my-awesome-feature"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("PUT");

        expect(request.requestHeaders).toEqual({
            "content-type": "application/json; charset=utf-8",
            "my-feature-toggle": "my-awesome-feature",
            "x-requested-with": "XMLHttpRequest"
        });

        expect(request.data()).toEqual({mydata: "data"});

    });

    it("should perform a DELETE request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpDelete"]().subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("DELETE");

        expect(request.requestHeaders).toEqual({"x-requested-with": "XMLHttpRequest"});

    });

    it("should perform an unsuccessful DELETE request", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpDelete"]().subscribe(
            (response) => {
            },
            err => {
                expect(err instanceof Error).toBeTruthy();
                expect(err.status).toEqual(404);
                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockNotFoundResponse(JSON.stringify({msg: "Not Found"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("DELETE");

        expect(request.requestHeaders).toEqual({"x-requested-with": "XMLHttpRequest"});

    });

    it("should perform a DELETE request providing a path segment", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpDelete"]("/mypath").subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test/mypath");

        expect(request.method).toEqual("DELETE");

        expect(request.requestHeaders).toEqual({"x-requested-with": "XMLHttpRequest"});

    });

    it("should perform a DELETE request with authentication", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint.jsonWebToken = "testtoken";

        endpoint["httpDelete"]().subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("DELETE");

        expect(request.requestHeaders).toEqual({"authorization": "Bearer testtoken", "x-requested-with": "XMLHttpRequest"});

    });

    it("should perform a DELETE request with additional header options", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const endpoint = new Endpoint(config, "/test");

        endpoint["httpDelete"](undefined, {"my-feature-toggle": "my-awesome-feature"}).subscribe(
            (response) => {
                expect(response.status).toEqual(200);
                expect(response.response).toEqual({test: "test"});

                done();
            });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({test: "test"})));

        expect(request.url).toBe("http://localhost:3333/test");

        expect(request.method).toEqual("DELETE");

        expect(request.requestHeaders).toEqual({"my-feature-toggle": "my-awesome-feature", "x-requested-with": "XMLHttpRequest"});

    });

});
