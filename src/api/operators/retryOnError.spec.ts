import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { retryOnError } from "./retryOnError";
import createSpy = jasmine.createSpy;

describe("RetryOnError Operator", () => {
    let scheduler: TestScheduler;

    beforeEach(() => {
        scheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it("Retry try on error", () => {
        scheduler.run(({cold, expectObservable}) => {

            const values = {a: 20};

            const ajaxError = {status: 0};

            const send = createSpy("send");
            send.and.returnValues(cold("-#", undefined, ajaxError), cold("-#", undefined, ajaxError), cold("-a", values));

            const source$ = of(undefined).pipe(
                switchMap(() => send())
            );

            const expectedMarble = "-----a";
            const expectedValues = {a: 20};

            const result$ = source$.pipe(
                retryOnError(1, 5, [0], true)
            );
            expectObservable(result$).toBe(expectedMarble, expectedValues);

        });
    });

});
