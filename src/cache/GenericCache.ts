import {BehaviorSubject, Observable} from 'rxjs';

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
    private cache: {[key: string]: BehaviorSubject<T|null> } = {};

    // TODO: check size of cache, delete oldest entries

    /**
     * Gets a specific item from the cache.
     * If not cached yet, the information will be fetched from Knora.
     *
     * @param key the id of the information to be returned.
     */
    getItem(key: string): BehaviorSubject<T|null> {

        // If the key already exists, return the associated BehaviorSubject.
        if (this.cache[key] !== undefined) {
            return this.cache[key];
        }

        // Create new entry for BehaviorSubject
        this.cache[key] = new BehaviorSubject(null);

        // Request information from Knora and update the BehaviorSubject
        // once the information is available
        this.requestItemFromKnora(key).subscribe((response: T) => {
            this.cache[key].next(response);
        });

        // return the BehaviorSubject (will be updated once the information is available)
        return this.cache[key];

    }

    /**
     * Deletes an existing entry in the cache and requests information from Knora.
     *
     * @param key the id of the information to be returned.
     */
    reloadItem(key: string): BehaviorSubject<T|null> {
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
