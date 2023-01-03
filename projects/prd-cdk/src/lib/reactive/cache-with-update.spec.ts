import { cacheWithUpdate } from './cache-with-update';
import { TestScheduler } from 'rxjs/testing';
import { Observable, of } from 'rxjs';

interface Data { _id: number; d: string; }

const initial: Data[] = [
    { _id: 0, d: 'a' },
    { _id: 1, d: 'b' },
];

const update: Data =
    { _id: 1, d: 'c' };

const insertion: Data =
    { _id: 3, d: 'e' };

const result: Data[] = [
    { _id: 0, d: 'a' },
    { _id: 1, d: 'c' },
];
const inserted: Data[] = [
    { _id: 3, d: 'e' },
    { _id: 0, d: 'a' },
    { _id: 1, d: 'c' },
];

const compareFn: (a: Data, b: Data) => boolean = (a, b) => a._id === b._id;

describe('Cache with update stream', () => {
    let testScheduler: TestScheduler;
    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });


    it('should pass initial data without changes', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
            const init = cold('       -x---|', { x: initial });
            const expected = '        -x---|';
            const subs = '            ^----!';

            expectObservable(init.pipe(
                cacheWithUpdate(of() as Observable<Data>, compareFn)
            )).toBe(expected, { x: initial });
            expectSubscriptions(init.subscriptions).toBe(subs);
        });
    });

    it('should change data', () => {
        testScheduler.run(({ cold, hot, expectObservable, expectSubscriptions }) => {
            const init = cold('     -x------|', { x: initial });
            const expected = '      -x-y-z';
            const upd = hot<Data>('y^--y-z----', { y: update, z: insertion });
            const subs = '          ^------!';
            const subsU = '         ^------!';
            const unsub = '         -------!';

            expectObservable(init.pipe(
                cacheWithUpdate(upd, compareFn)
            ), unsub).toBe(expected, { x: initial, y: result, z: inserted });
            expectSubscriptions(init.subscriptions).toBe(subs);
            expectSubscriptions(upd.subscriptions).toBe(subsU);
        });
    });
});