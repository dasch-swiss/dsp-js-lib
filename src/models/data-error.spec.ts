import { AjaxError } from "rxjs/ajax";
import { ApiResponseError } from "./api-response-error";
import { DataError } from "./data-error";

describe("Test class DataError", () => {

    describe("Test method constructor()", () => {

        const ajaxError = new AjaxError("Error", new XMLHttpRequest(), {} as any);
        const dataError = new DataError("Error", ApiResponseError.fromAjaxError(ajaxError));

        it("should be an instance of Error", () => {
            expect(dataError).toEqual(jasmine.any(Error));
        });

        it("should be an instance of DataError", () => {
            expect(dataError).toEqual(jasmine.any(DataError));
        });

    });

});
