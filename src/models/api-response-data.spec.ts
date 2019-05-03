import { AjaxResponse } from "rxjs/ajax";
import { ApiResponseData } from "./api-response-data";

describe("Test class ApiResponseData", () => {

    describe("Test method fromAjaxResponse()", () => {

        const ajaxResponse = new AjaxResponse({} as any, new XMLHttpRequest(), {});
        const apiResponseData = ApiResponseData.fromAjaxResponse(ajaxResponse);

        it("should be an instance of ApiResponseData", () => {
            expect(apiResponseData).toEqual(jasmine.any(ApiResponseData));
        });

        it("should store the request data", () => {
            expect(apiResponseData.method).toBe("");
            // expect(apiResponseData.status).toBe(123);
            // expect(apiResponseData.url).toBe("");
            // expect(apiResponseData.response).toBe(ajaxResponse);
        });

        it("should store the body", () => {
            expect(apiResponseData.body).toBe("");
        });

    });

});
