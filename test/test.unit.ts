import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import get from "../test/data/api/admin/users/get.json";

import { Users } from "../src/model/api/admin/users";
import { UserList } from "../src/model/classes/admin/user-list";
import { AjaxResponse } from "rxjs/ajax";

describe('Test API /admin/users/ endpoints', () => {

    let value: AjaxResponse;
    let error: any;

    beforeEach((done) => {

        const user = new Users();

        user.httpGet("").subscribe(
            (_value: any) => {
                value = _value;
                done();
            },
            (_error: any) => {
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

        const users = new Users();

        spyOn(users, "getAllUsers").and.callFake(
            (): Observable<UserList> => {
                return of(get).pipe(
                    map((v: any) => {
                        return users.jsonConvert.deserialize(v, UserList)
                    })
                );
            }
        );

        users.getAllUsers().subscribe(
            (userList: UserList) => {
                expect(userList.users.length).toBeGreaterThan(0);
            }
        );

    });

});