import { AsyncSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

/**
 * @internal
 * Generic cache class.
 * Fetches information of a specific type from Knora once and caches it.
 * Fetches also dependencies of a requested element (non-blocking).
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
     * @param isDependency true if the item to be returned
     *        is a dependency of another item (recursive call to this method).
     * @return the requested item.
     */
    protected getItem(key: string, isDependency = false): AsyncSubject<T> {
        // console.log("getItem", key, this.cache[key]);

        // If the key already exists,
        // return the associated AsyncSubject.
        if (this.cache[key] !== undefined) {
            return this.cache[key];
        }

        // Item for `key` does not exist yet in cache.
        // Create an entry for a new AsyncSubject
        this.cache[key] = new AsyncSubject();

        // Requests information from Knora and updates the AsyncSubject
        // once the information is available
        //
        // take(1) ensures that the subscription is terminated
        // when the first value was emitted.
        this.requestItemFromKnora(key, isDependency).pipe(take(1)).subscribe((items: T[]) => {
            // console.log("fetching from Knora", key);

            if (items.length === 0) throw Error("No items returned from Knora for " + key);

            if (key !== this.getKeyOfItem(items[0])) throw Error("First item of items returned from Knora is expected to be " + key);

            // Updates and completes the AsyncSubject for `key`.
            this.cache[key].next(items[0]);
            this.cache[key].complete();

            // Write all available items to the cache (only for non existing keys)
            // Analyze dependencies of available items.
            items.forEach(
                (item: T) => {
                    // Get key of item
                    const itemKey = this.getKeyOfItem(item);

                    // Only write an additional item to the cache
                    // if there is not entry for it yet
                    // item for `key` has already been handled
                    if (this.cache[itemKey] === undefined) {
                        this.cache[itemKey] = new AsyncSubject();
                        this.cache[itemKey].next(item);
                        this.cache[itemKey].complete();
                    }

                    // get items this item depends on
                    this.getDependenciesOfItem(item)
                        .filter((depKey: string) => {
                            // ignore dependencies already taken care of
                            return Object.keys(this.cache).indexOf(depKey) === -1;
                        })
                        .forEach((depKey: string) => {
                            // Request each dependency from the cache
                            // Dependencies will be fetched asynchronously.
                            this.getItem(depKey, true);
                        });
                }
            );
        });

        // return the AsyncSubject for `key` (will be updated once the information is available)
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
     * @param isDependency true if the requested key is a dependency of another item.
     * @return the items received from Knora.
     */
    protected abstract requestItemFromKnora(key: string, isDependency: boolean): Observable<T[]>;

    /**
     * Given an item, determines its key.
     *
     * @param item The item whose key has to be determined.
     */
    protected abstract getKeyOfItem(item: T): string;

    /**
     * Given an item, determines its dependencies on other items.
     *
     * @param item the item whose dependencies have to be determined.
     * @return keys of the items the current item relies on.
     */
    protected abstract getDependenciesOfItem(item: T): string[];

}
