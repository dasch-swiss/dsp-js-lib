import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import get from "../test/data/api/admin/users/get.json";

import { Users } from "../src/model/api/admin/users";
import { UserList } from "../src/model/classes/admin/user-list";

describe('Test API /admin/users/ endpoints', () => {

    it("should succeed indeed", () => {

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