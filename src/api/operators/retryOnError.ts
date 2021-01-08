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

    // inspired by https://medium.com/angular-in-depth/retry-failed-http-requests-in-angular-f5959d486294
    return (src: Observable<AjaxResponse>) =>
        src.pipe(
            retryWhen(errors =>
                errors.pipe(
                    // log error message if logging is enabled
                    tap((error: AjaxError) => {
                        if (logError) console.error("HTTP request failed:", "status:", error.status, "retries:", retries, "error:", error);
                    }),
                    mergeMap((error: AjaxError) => {
                        // retry on specified error status
                        // check if max retries is reached ("retries" is decremented on each retry)
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
