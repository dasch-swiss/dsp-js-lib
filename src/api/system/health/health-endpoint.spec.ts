import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ApiResponseData } from "../../../models/api-response-data";
import { HealthResponse } from "../../../models/system/health-response";

describe("HealthEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    const getServerFromResponseHeader = (resHeader: string) => {
        // split by newline: first line server info, second line date
        const headerParts = resHeader.split("\n");
        // remove "Server: " from string
        return headerParts[0].replace("Server: ", "");
    }

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getHealthStatus", () => {

        it("should return a running health status", done => {

            knoraApiConnection.system.healthEndpoint.getHealthStatus().subscribe(
                (response: ApiResponseData<HealthResponse>) => {

                    expect(response.body.name).toEqual("AppState");
                    expect(response.body.message).toEqual("Application is healthy");
                    expect(response.body.severity).toEqual("non fatal");
                    expect(response.body.status).toEqual(true);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const health = require("../../../../test/data/api/system/health/running-response.json");

            const responseHeader = require("../../../../test/data/api/system/health/response-headers.txt");

            request.respondWith({
                status: 200,
                responseText: JSON.stringify(health),
                response: health,
                responseHeaders: {
                    server: getServerFromResponseHeader(responseHeader)
                }
            });

            expect(request.url).toBe("http://localhost:3333/health");

            expect(request.method).toEqual("GET");

        });

        it("should return a maintenance mode health status", done => {

            knoraApiConnection.system.healthEndpoint.getHealthStatus().subscribe(
                (response: ApiResponseData<HealthResponse>) => {

                    expect(response.body.name).toEqual("AppState");
                    expect(response.body.message).toEqual("Application is in maintenance mode. Please retry later.");
                    expect(response.body.severity).toEqual("non fatal");
                    expect(response.body.status).toEqual(false);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const health = require("../../../../test/data/api/system/health/maintenance-mode-response.json");

            const responseHeader = require("../../../../test/data/api/system/health/response-headers.txt");

            request.respondWith({
                status: 200,
                responseText: JSON.stringify(health),
                response: health,
                responseHeaders: {
                    server: getServerFromResponseHeader(responseHeader)
                }
            });

            expect(request.url).toBe("http://localhost:3333/health");

            expect(request.method).toEqual("GET");

        });

        it("should return a stopped mode health status", done => {

            knoraApiConnection.system.healthEndpoint.getHealthStatus().subscribe(
                (response: ApiResponseData<HealthResponse>) => {

                    expect(response.body.name).toEqual("AppState");
                    expect(response.body.message).toEqual("Stopped. Please retry later.");
                    expect(response.body.severity).toEqual("non fatal");
                    expect(response.body.status).toEqual(false);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const health = require("../../../../test/data/api/system/health/stopped-response.json");

            const responseHeader = require("../../../../test/data/api/system/health/response-headers.txt");

            request.respondWith({
                status: 200,
                responseText: JSON.stringify(health),
                response: health,
                responseHeaders: {
                    server: getServerFromResponseHeader(responseHeader)
                }
            });

            expect(request.url).toBe("http://localhost:3333/health");

            expect(request.method).toEqual("GET");

        });


    });

});
