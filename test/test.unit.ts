import { Test } from "../src/test";

describe('Unit tests', () => {

    it("should succeed", () => {
        const test = new Test();
        expect(test.hello("dude")).toEqual("Hello, dude");
    });

});