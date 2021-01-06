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

    return (src: Observable<AjaxResponse>) =>
        src.pipe(
            retryWhen(errors =>
                errors.pipe(
                    delay(delayMs),
                    // log error message
                    tap((error: AjaxError) => {
                        if (logError) console.error("HTTP request failed", error);
                    }),
                    mergeMap((error: AjaxError) => retryOnErrorStatus.indexOf(error.status) !== -1 && --retries > 0 ? of(error) : throwError(error))
                )));

}
