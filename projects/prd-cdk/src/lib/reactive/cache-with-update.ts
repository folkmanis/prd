import { merge, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

export function cacheWithUpdate<T>(
    update$: Observable<T>,
    compareFn: (o1: T, o2: T) => boolean
): MonoTypeOperatorFunction<T[]> {
    let cache: T[];
    return (data$: Observable<T[]>): Observable<T[]> => {
        return merge(
            data$.pipe(tap(d => cache = d)),
            update$.pipe(
                filter(_ => !!cache),
                map(item => cache.map(c => compareFn(c, item) ? item : c)),
                tap(data => cache = data)
            )
        );
    };
}
