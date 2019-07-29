import {BehaviorSubject, Observable} from 'rxjs';

export abstract class GenericCache<T> {

    private cache: {[key: string]: BehaviorSubject<T|null> } = {};

    getItem(key: string): BehaviorSubject<T|null> {

        if (this.cache[key] !== undefined) {
            return this.cache[key];
        }

        this.cache[key] = new BehaviorSubject(null);

        this.requestItemFromKnora(key).subscribe((response: T) => {
            this.cache[key].next(response);
        });

        return this.cache[key];

    }

    reloadItem(key: string): BehaviorSubject<T|null> {
        delete this.cache[key];
        return this.getItem(key);
    }

    protected abstract requestItemFromKnora(key: string): Observable<T>;

}
