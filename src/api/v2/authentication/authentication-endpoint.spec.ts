import { LogoutResponse } from  "../../../models/v2/authentication/logout-response";
import { ApiResponseError } from "../../../models/api-response-error";
import { LoginResponse } from "../../../models/v2/authentication/login-response";
import { ApiResponseData } from "../../../models/api-response-data";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";

describe("Test class AuthenticationEndpoint", () => {

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("should perform a login", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const knoraApiConnection = new KnoraApiConnection(config);

        knoraApiConnection.v2.auth.login("user", "test").subscribe((response: ApiResponseData<LoginResponse>) => {

            expect(response.body.token).toEqual("testtoken");
            expect(knoraApiConnection.v2.jsonWebToken).toEqual("testtoken");

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({token: "testtoken"})));

        expect(request.url).toEqual("http://localhost:3333/v2/authentication");

        expect(request.method).toEqual("POST");

        expect(request.data()).toEqual({username: "user", password: "test"});

    });

    it("should attempt to perform a login with invalid credentials", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const knoraApiConnection = new KnoraApiConnection(config);

        knoraApiConnection.v2.auth.login("user", "wrongpassword").subscribe(
            () => {
            },
            (err: ApiResponseError) => {
                expect(err.status).toEqual(401);
                expect(knoraApiConnection.v2.jsonWebToken).toEqual("");
                done();
            }
        );

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockNotAuthorizedResponse(JSON.stringify({
            "knora-api:error": "org.knora.webapi.BadCredentialsException: bad credentials: not valid",
            "@context": {"knora-api": "http://api.knora.org/ontology/knora-api/v2#"}
        })));

        expect(request.url).toEqual("http://localhost:3333/v2/authentication");

        expect(request.method).toEqual("POST");

        expect(request.data()).toEqual({username: "user", password: "wrongpassword"});

    });

    it("should perform a logout", done => {

        const config = new KnoraApiConfig("http", "localhost", 3333);

        const knoraApiConnection = new KnoraApiConnection(config);

        knoraApiConnection.v2.auth.logout().subscribe((response: ApiResponseData<LogoutResponse>) => {

            expect(response.body.status).toEqual(0);
            expect(response.body.message).toEqual("Logout OK");
            expect(knoraApiConnection.v2.jsonWebToken).toEqual("");

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({message: "Logout OK", status: 0})));

        expect(request.url).toEqual("http://localhost:3333/v2/authentication");

        expect(request.method).toEqual("DELETE");

    });

});
