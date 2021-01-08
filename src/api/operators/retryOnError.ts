import { Observable, of, throwError } from "rxjs";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { delay, mergeMap, retryWhen, tap } from "rxjs/operators";

/**
 *
 * Retries failed HTTP requests.
 *
 * @param delayMs delay in milliseconds before the request is retried.
 * @param maxRetries maximum number of retries.
 * @param retryOnErrorStatus HTTP error status codes for which the request is retried.
 * @param logError if true, error is written to the console error log.
 *
 * @category Internal
 */
export function retryOnError(delayMs: number, maxRetries: number, retryOnErrorStatus: number[], logError: boolean) {
    let retries = maxRetries;

    return (src: Observable<any>) =>
        src.pipe(
            retryWhen(errors =>
                errors.pipe(
                    // log error message if logging is enabled
                    tap((error: AjaxError) => {
                        if (logError) console.error("HTTP request failed", error.status, retries);
                    }),
                    mergeMap((error: AjaxError) => {
                        // retry on specified error status
                        // check if max retries is reached
                        if (retryOnErrorStatus.indexOf(error.status) !== -1 && retries-- > 0) {
                            return of(error).pipe(
                                // delay retry
                                delay(delayMs)
                            );
                        } else {
                            // do not retry
                            return throwError(error);
                        }
                    })
                )));
}
