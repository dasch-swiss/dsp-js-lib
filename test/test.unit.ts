import { Test } from "../src/test";
import { AjaxError, AjaxResponse } from "rxjs/ajax";

describe('Unit tests', () => {

    it("should succeed indeed", () => {
        const test = new Test();
        test.hello("dude").subscribe(
            (value: AjaxResponse) => {
                console.log(value);
                expect(true).toBe(false);
            },
            (error: AjaxError) => {
                console.error(error);
                expect(true).toBe(false);
            }
        );
    });

});