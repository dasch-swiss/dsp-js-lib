import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ApiResponseData } from "../../../models/api-response-data";
import { HealthResponse } from "../../../models/system/health-response";

describe("HealthEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getHealth", () => {

        it("should return health status", done => {

            knoraApiConnection.system.healthEndpoint.getHealth().subscribe(
                (response: ApiResponseData<HealthResponse>) => {

                    expect(response.body.name).toEqual("AppState");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const health = require("../../../../test/data/api/system/health/get-health-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(health)));

            expect(request.url).toBe("http://localhost:3333/health");

            expect(request.method).toEqual("GET");

        });

    });

});
