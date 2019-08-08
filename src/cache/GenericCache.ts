import {AsyncSubject, forkJoin, Observable} from 'rxjs';

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

    // Keep track of dependencies
    private dependencies: Set<string> = new Set([]);

    // TODO: check size of cache, delete oldest entries

    /**
     * Gets a specific item from the cache.
     * If not cached yet, the information will be fetched from Knora.
     *
     * @param key the id of the item to be returned.
     * @return the item.
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

            // collect keys of items this item depends on
            let depKeys = this.getDependenciesOfItem(response);

            /*console.log('key ', key);
            console.log('dependencies ', depKeys.toString());
            console.log('requested Keys: ', this.dependencies.toString());*/

            // ignore keys that were already requested and self-dependencies
            depKeys = depKeys.filter((depKey: string) => {
                return !this.dependencies.has(depKey) && depKey !== key;
            });

            this.dependencies = new Set(Array.from(this.dependencies).concat(depKeys));

            /*console.log('dependencies to resolve ', depKeys.toString());
            console.log("=======");*/

            const dependencies: Array<AsyncSubject<T>> = [];

            // request each dependency from the cache
            // push each dependency to the dependencies array
            depKeys.forEach((depKey: string) => {
                const depItem: AsyncSubject<T> = this.getItem(depKey);
                dependencies.push(depItem);
            });

            // forkJoin completes once all dependencies have been resolved
            forkJoin(dependencies).subscribe({
                complete: () => {
                    // all dependencies have been resolved
                    // complete the current item
                    this.cache[key].next(response);
                    this.cache[key].complete();
                }
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
    reloadItem(key: string): AsyncSubject<T> {
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
