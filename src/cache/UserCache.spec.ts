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

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333);
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

            userCache["getItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res: UserResponse) => {

                expect(res.user.id).toEqual("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q");
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                expect(userCache["cache"]["http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q"]).not.toBeUndefined();
                done();

            });
        });

        it("should get the user from the cache twice synchronously", done => {

            userCache["getItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res: UserResponse) => {
                expect(res.user.id).toEqual("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q");
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                userCache["getItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res2: UserResponse) => {
                    expect(res2.user.id).toEqual("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q");
                    expect(getUserSpy).toHaveBeenCalledTimes(1);
                    done();
                });
            });
        });

        it("should get the same user from the cache several times asynchronously", () => {

            userCache["getItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            userCache["getItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            userCache["getItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);
            });

            expect(getUserSpy).toHaveBeenCalledTimes(1);
            expect(getUserSpy).toHaveBeenCalledWith("iri", "http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q");

        });

        it("should get a user from the cache and refresh the entry", done => {

            userCache["getItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res: UserResponse) => {
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                userCache["reloadItem"]("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res2: UserResponse) => {
                    expect(getUserSpy).toHaveBeenCalledTimes(2);
                    done();
                });
            });

        });

    });

    describe("Method getUser", () => {

        it("should get a user by its Iri", done => {
            userCache.getUser("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q").subscribe((res: UserResponse) => {

                expect(res.user.id).toEqual("http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q");
                expect(getUserSpy).toHaveBeenCalledTimes(1);

                expect(userCache["cache"]["http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q"]).not.toBeUndefined();
                done();
            });
        });

    });

});
