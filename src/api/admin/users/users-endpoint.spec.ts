import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { UsersResponse } from "../../../models/admin/users-response";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";

describe("Test class UsersEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    describe("Test method getUsers()", () => {

        it("should work", () => {

            // TODO mock/spy http get method
            knoraApiConnection.admin.users.getUsers().subscribe(
                (response: ApiResponseData<UsersResponse>) => {
                    expect(response.response).toEqual(jasmine.any(UsersResponse));
                },
                (error: ApiResponseError) => {
                    expect(error).toEqual(jasmine.any(ApiResponseError));
                }
            );

        });

    });

});
