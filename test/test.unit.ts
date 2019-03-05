import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import get from "../test/data/api/admin/users/get.json";

import { UserList } from "../src/classes/admin/user-list";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { KnoraApiConnection } from "../src/knora-api-connection";

describe('Test API /admin/users/ endpoints', () => {

    const knoraApiConnection = new KnoraApiConnection("http://0.0.0.0", 3333);

    let value: AjaxResponse;
    let error: any;

    beforeEach((done) => {

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

    });

    it("should check the function", () => {


        spyOn(knoraApiConnection.admin.users, "getAll").and.callFake(
            (): Observable<UserList | AjaxError> => {
                return of(get).pipe(
                    map((v: any) => {
                        return knoraApiConnection.admin.users.jsonConvert.deserializeObject(v, UserList)
                    })
                );
            }
        );

        knoraApiConnection.admin.users.getAll().subscribe(
            (userList: UserList) => {
                expect(userList.users.length).toBeGreaterThan(0);
            }
        );

    });

});