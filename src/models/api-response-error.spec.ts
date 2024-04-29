import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { ApiResponseData } from "./api-response-data";
import { ApiResponseError } from "./api-response-error";

xdescribe("Test class ApiResponseError", () => {

    describe("Test method fromAjaxError()", () => {

        const ajaxError = new AjaxError("Error", new XMLHttpRequest(), {} as any);
        const apiResponseError = ApiResponseError.fromAjaxError(ajaxError);

        it("should be an instance of ApiResponseError", () => {
            expect(apiResponseError).toEqual(jasmine.any(ApiResponseError));
        });

        it("should store the original error", () => {
            expect(apiResponseError.error).toBe(ajaxError);
        });

    });

    describe("Test method fromErrorString()", () => {

        const errorString = "Error string";
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, {} as any));
        const apiResponseError = ApiResponseError.fromErrorString(errorString, responseData);

        it("should be an instance of ApiResponseError", () => {
            expect(apiResponseError).toEqual(jasmine.any(ApiResponseError));
        });

        it("should store the original error", () => {
            expect(apiResponseError.error).toBe(errorString);
        });

    });

});
