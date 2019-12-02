import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { UserResponse } from "../models/admin/user-response";
import { ApiResponseData } from "../models/api-response-data";
import { ApiResponseError } from "../models/api-response-error";
import { UserCache } from "./UserCache";

describe("UserCache", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    let getUserSpy: jasmine.Spy;
    let userCache: UserCache;

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    const user = require("../../test/data/api/admin/users/get-user-response.json");

    const userResp = jsonConvert.deserialize(user, UserResponse) as UserResponse;

    beforeEach(() => {

        jasmine.Ajax.install();

        getUserSpy = spyOn(knoraApiConnection.admin.usersEndpoint, "getUser").and.callFake(
            (prop: "iri" | "username" | "email", userId: string) => {

                return of({body: userResp} as ApiResponseData<UserResponse> | ApiResponseError);
            }
        );

        userCache = new UserCache(knoraApiConnection);

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getItem", () => {

        it("should get a user from the cache", done => {

            userCache["getItem"]("anything.user01").subscribe((res: UserResponse) => {

                expect(res.user.username).toEqual("anything.user01");
                expect(getUserSpy).toHaveBeenCalledTimes(1);
                expect(getUserSpy).toHaveBeenCalledWith("username", "anything.user01");

                expect(userCache["cache"]["anything.user01"]).not.toBeUndefined();
                done();

            });
        });

        it("should get the user from the cache twice synchronously", done => {

            userCache["getItem"]("anything.user01").subscribe((res: UserResponse) => {
                expect(res.user.username).toEqual("anything.user01");
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                userCache["getItem"]("anything.user01").subscribe((res2: UserResponse) => {
                    expect(res2.user.username).toEqual("anything.user01");
                    expect(getUserSpy).toHaveBeenCalledTimes(1);
                    done();
                });
            });
        });

        it("should get the same user from the cache several times asynchronously", () => {

            userCache["getItem"]("anything.user01").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            userCache["getItem"]("anything.user01").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            userCache["getItem"]("anything.user01").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            expect(getUserSpy).toHaveBeenCalledTimes(1);
            expect(getUserSpy).toHaveBeenCalledWith("username", "anything.user01");

        });

        it("should get a user from the cache and refresh the entry", done => {

            userCache["getItem"]("anything.user01").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                userCache["reloadItem"]("anything.user01").subscribe((res2: UserResponse) => {
                    expect(getUserSpy).toHaveBeenCalledTimes(2);
                    done();
                });
            });

        });

    });

});
