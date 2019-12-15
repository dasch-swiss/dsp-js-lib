import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Observable, of } from "rxjs";
import { UserResponse } from "..";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { FullListResponse } from "../models/admin/fulllist-response";
import { FullList } from "../models/admin/lists";
import { ApiResponseData } from "../models/api-response-data";
import { ApiResponseError } from "../models/api-response-error";
import { ListCache } from "./ListCache";

describe("ListCache", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    let getListSpy: jasmine.Spy;
    let listCache: ListCache;

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    const list = require("../../test/data/api/admin/lists/fulllist.json");

    const listResp = jsonConvert.deserialize(list, FullListResponse) as FullListResponse;

    beforeEach(() => {

        jasmine.Ajax.install();

        getListSpy = spyOn(knoraApiConnection.admin.listsEndpoint, "getFullList").and.callFake(
            (listIri: string) => {

                return of({body: listResp} as ApiResponseData<FullListResponse> | ApiResponseError); // Observable<FullList | ApiResponseError>
            }
        );

        listCache = new ListCache(knoraApiConnection.admin.listsEndpoint);

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getItem", () => {

        it("should get a full list from the cache", done => {

            listCache["getItem"]("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ").subscribe((res: FullListResponse) => {

                expect(res.list.listinfo.id).toEqual("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ");
                expect(res.list.listinfo.labels).toBeDefined();
                if (res.list.listinfo.labels) {
                    expect(res.list.listinfo.labels.length).toEqual(1);
                    expect(res.list.listinfo.name).toEqual("articletype");
                    if (res.list.listinfo.labels.length == 1) {
                        expect(res.list.listinfo.labels[0].language).toEqual("de");
                        expect(res.list.listinfo.labels[0].value).toEqual("Artikeltyp");
                    }
                }
                expect(getListSpy).toHaveBeenCalledTimes(1);

                expect(listCache["cache"]["http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ"]).not.toBeUndefined();

                done();
            });
        });

        it("should get the full list from the cache twice synchronously", done => {
            listCache["getItem"]("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ").subscribe((res: FullListResponse) => {
                expect(res.list.listinfo.id).toEqual("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ");
                expect(getListSpy).toHaveBeenCalledTimes(1);

                listCache["getItem"]("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ").subscribe((res2: FullListResponse) => {
                    expect(res2.list.listinfo.id).toEqual("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ");
                    expect(getListSpy).toHaveBeenCalledTimes(1);
                });

                done();
            });
        });

        it("should get the same full list from the cache several times asynchronously", () => {

            listCache["getItem"]("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ").subscribe((res: FullListResponse) => {
                expect(getListSpy).toHaveBeenCalledTimes(1);
            });

            listCache["getItem"]("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ").subscribe((res: FullListResponse) => {
                expect(getListSpy).toHaveBeenCalledTimes(1);
            });

            listCache["getItem"]("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ").subscribe((res: FullListResponse) => {
                expect(getListSpy).toHaveBeenCalledTimes(1);
            });

            expect(getListSpy).toHaveBeenCalledTimes(1);
            expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ");

        });

    });

});
