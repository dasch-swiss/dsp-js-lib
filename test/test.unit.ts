import { config, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import get from "../test/data/api/admin/users/get.json";

import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { KnoraApiConfig, KnoraApiConnection } from "../src";
import { ApiResponseData } from "../src/models/api-response-data";
import { UserList } from "../src/models/admin/user-list";
import { ApiResponseError } from "../src/models/api-response-error";

describe('Test API /admin/users/ endpoints', () => {

    const config = new KnoraApiConfig("http", "localhost", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    let value: AjaxResponse;
    let error: any;

   /* beforeEach((done) => {

        knoraApiConnection.admin.users.getAll().subscribe(
            (_value: any) => {
                console.log(_value);
                value = _value;
                done();
            },
            (_error: any) => {
                console.log(_error);
                error = _error;
                done();
            }
        );

    });

    it("should check the endpoint class", () => {

        expect(value).toBeUndefined();
        expect(error).toBeDefined();

    });*/

    it("should check the function", () => {


        spyOn(knoraApiConnection.admin.users, "getAll").and.callFake(
            (): Observable<ApiResponseData<UserList> | ApiResponseError> => {
                return of(get).pipe(
                    map((v: any) => {
                    })
                );
            }
        );

        knoraApiConnection.admin.users.getAll().subscribe(
            (responseData: ApiResponseData<UserList>) => {
                console.log(responseData.body.users.length);
                expect(responseData.body.users.length).toBeGreaterThan(0);
            }
        );

    });

});