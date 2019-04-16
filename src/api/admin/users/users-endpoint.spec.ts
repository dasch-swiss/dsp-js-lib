/*import { Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";

describe("Test class UsersEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    /*
    describe("Test getUsers()", () => {

        spyOn(knoraApiConnection.admin.users, "getAll").and.callFake(
            (): Observable<UserList | AjaxError> => {
                (): Observable<ApiResponseData<UserList> | ApiResponseError> => {
                    return of(get).pipe(
                        map((v: any) => {
                            return knoraApiConnection.admin.users.jsonConvert.deserializeObject(v, UserList)
                        })
                    );
                }
            );

        it("should work", () => {

            knoraApiConnection.admin.users.getUsers().subscribe();

            expect(true).toBe(true);

        });

    });

});*/
