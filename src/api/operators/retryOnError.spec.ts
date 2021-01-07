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

    it("should get a completed response after 3 unsuccessful requests", () => {
        scheduler.run(({cold, expectObservable}) => {

            const values = {a: 20};

            const ajaxError = {status: 0};

            // https://stackoverflow.com/questions/57406445/rxjs-marble-testing-retrywhen
            const http = createSpy("http");
            http.and.returnValues(
                cold("-#", undefined, ajaxError),
                cold("-#", undefined, ajaxError),
                cold("-#", undefined, ajaxError),
                cold("-a|", values)
            );

            const source$ = of(undefined).pipe(
                switchMap(() => http())
            );

            const expectedMarble = "-------a|";
            const expectedValues = {a: 20};

            const result$ = source$.pipe(
                retryOnError(1, 5, [0], true)
            );
            expectObservable(result$).toBe(expectedMarble, expectedValues);

        });
    });

});
