import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import get from "../test/data/api/admin/users/get.json";

import { UsersEndpoint } from "../src/api/admin/users-endpoint";
import { UserList } from "../src/classes/admin/user-list";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { AdminEndpoints } from "../src/api/admin-endpoints";
import { KnoraApiConnection } from "../src/knora-api-connection";

describe('Test API /admin/users/ endpoints', () => {

    const knoraApiConnection = new KnoraApiConnection("http://0.0.0.0:3333");

    let value: AjaxResponse;
    let error: any;

    beforeEach((done) => {

        knoraApiConnection.adminEndpoint.usersEndpoint.getAllUsers().subscribe(
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

    });

    it("should check the function", () => {


        spyOn(knoraApiConnection.adminEndpoint.usersEndpoint, "getAllUsers").and.callFake(
            (): Observable<UserList | AjaxError> => {
                return of(get).pipe(
                    map((v: any) => {
                        return knoraApiConnection.adminEndpoint.usersEndpoint.jsonConvert.deserializeObject(v, UserList)
                    })
                );
            }
        );

        knoraApiConnection.adminEndpoint.usersEndpoint.getAllUsers().subscribe(
            (userList: UserList) => {
                expect(userList.users.length).toBeGreaterThan(0);
            }
        );

    });

});