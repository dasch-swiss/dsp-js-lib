import { Test } from "../src/test";
import { AjaxError, AjaxResponse } from "rxjs/ajax";

describe('Unit tests', () => {

    it("should succeed indeed", () => {
        const test = new Test();
        test.hello("dude").subscribe(
            (value: AjaxResponse) => {
                console.log("here1");
                expect(true).toBe(false);
            },
            (error: AjaxError) => {
                console.error("here2");
                expect(true).toBe(false);
            }
        );
        console.log("here");
    });

});