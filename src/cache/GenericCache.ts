import { AsyncSubject, Observable } from "rxjs";

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
    private cache: { [key: string]: AsyncSubject<T> } = {};

    // TODO: check size of cache, delete oldest entries

    /**
     * Gets a specific item from the cache.
     * If not cached yet, the information will be fetched from Knora.
     *
     * @param key the id of the item to be returned.
     * @return the requested item.
     */
    protected getItem(key: string): AsyncSubject<T> {
        // console.log("getItem", key, this.cache[key]);

        // If the key already exists, return the associated AsyncSubject.
        if (this.cache[key] !== undefined) {
            return this.cache[key];
        }

        // Item does not exist yet in cache.
        // Create an entry for a new AsyncSubject
        this.cache[key] = new AsyncSubject();

        // Requests information from Knora and updates the AsyncSubject
        // once the information is available
        this.requestItemFromKnora(key).subscribe((response: T) => {
            // console.log("fetching from Knora", key);

            // Updates and completes the AsyncSubject.
            this.cache[key].next(response);
            this.cache[key].complete();

            // collect keys of items this item depends on
            let dependencyKeysToGet = this.getDependenciesOfItem(response);

            // ignore dependencies already taken care of
            dependencyKeysToGet = dependencyKeysToGet.filter((depKey: string) => {
                return Object.keys(this.cache).indexOf(depKey) === -1;
            });

            // Request each dependency from the cache
            // Dependencies will be fetched asynchronously.
            dependencyKeysToGet.forEach((depKey: string) => {
                this.getItem(depKey);
            });

        });

        // return the AsyncSubject (will be updated once the information is available)
        return this.cache[key];

    }

    /**
     * Deletes an existing entry in the cache and requests information from Knora.
     *
     * @param key the id of the information to be returned.
     * @return the item.
     */
    protected reloadItem(key: string): AsyncSubject<T> {
        if (this.cache[key] !== undefined) delete this.cache[key];
        return this.getItem(key);
    }

    /**
     * Fetches information from Knora.
     *
     * @param key the id of the information to be returned.
     * @return the item received from Knora.
     */
    protected abstract requestItemFromKnora(key: string): Observable<T>;

    /**
     * Given an item, determines its dependencies on other items.
     *
     * @param item the item whose dependencies have to be determined.
     * @return keys of the items the current item relies on.
     */
    protected abstract getDependenciesOfItem(item: T): string[];

}
