import { AdminEndpoint } from "./api/admin/admin-endpoint";
import { V2Endpoint } from "./api/v2/v2-endpoint";
import { KnoraApiConfig } from "./knora-api-config";
import { KnoraApiConnection } from "./knora-api-connection";

describe("Test class KnoraApiConnection", () => {

    const config = new KnoraApiConfig("http", "localhost");

    describe("Test method constructor()", () => {

        const connection = new KnoraApiConnection(config);

        it("should create the AdminEndpoint", () => {
            expect(connection.admin).toEqual(jasmine.any(AdminEndpoint));
        });

        it("should create the V2Endpoint", () => {
            expect(connection.v2).toEqual(jasmine.any(V2Endpoint));
        });

    });

});
