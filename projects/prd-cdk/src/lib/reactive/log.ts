import { pipe, MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

export function log<T>(messageOrPredicate: string | ((val: T) => any), message?: string): MonoTypeOperatorFunction<T> {
    const predicate = typeof messageOrPredicate === 'function' ? messageOrPredicate : (obj: T) => obj;
    message = typeof messageOrPredicate === 'string' ? messageOrPredicate : message;
    if (message) {
        return pipe(
            tap(obj => console.log(message, predicate(obj))),
        );
    } else {
        return pipe(
            tap(obj => console.log(predicate(obj))),
        );
    }
};
