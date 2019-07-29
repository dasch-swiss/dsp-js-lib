import {AsyncSubject, Observable} from 'rxjs';

/**
 * Generic cache class.
 * Fetches information of a specific type from Knora once and caches it.
 *
 * Works also with multiple async requests for the same key, also if not cached yet.
 */
export abstract class GenericCache<T> {

    /**
     * Cache object: key -> value.
     */
    private cache: {[key: string]: AsyncSubject<T> } = {};

    // TODO: check size of cache, delete oldest entries

    /**
     * Gets a specific item from the cache.
     * If not cached yet, the information will be fetched from Knora.
     *
     * @param key the id of the information to be returned.
     */
    getItem(key: string): AsyncSubject<T> {

        // If the key already exists, return the associated AsyncSubject.
        if (this.cache[key] !== undefined) {
            return this.cache[key];
        }

        // Create new entry for AsyncSubject
        this.cache[key] = new AsyncSubject();

        // Request information from Knora and update the AsyncSubject
        // once the information is available
        this.requestItemFromKnora(key).subscribe((response: T) => {
            this.cache[key].next(response);
            this.cache[key].complete();
        });

        // return the AsyncSubject (will be updated once the information is available)
        return this.cache[key];

    }

    /**
     * Deletes an existing entry in the cache and requests information from Knora.
     *
     * @param key the id of the information to be returned.
     */
    reloadItem(key: string): AsyncSubject<T> {
        delete this.cache[key];
        return this.getItem(key);
    }

    /**
     * Fetches information from Knora.
     *
     * @param key the id of the information to be returned.
     */
    protected abstract requestItemFromKnora(key: string): Observable<T>;

}
