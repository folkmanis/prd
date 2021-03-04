import { log } from './log';
import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';

describe('it should output to console', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should not change stream', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable, expectSubscriptions } = helpers;
            const e1 = cold(' abc-|');
            const expected = 'abc-|';

            expectObservable(e1.pipe(log('testing'))).toBe(expected);
        });
    });

    it('should output to console', () => {

        const output = 'txt';

        spyOn(console, 'log');

        testScheduler.run(({ cold, expectObservable, flush }) => {
            expectObservable(
                cold('a|', { a: output }).pipe(log('testing'))
            ).toBe('  a|', { a: output });

            flush();
            expect(console.log).toHaveBeenCalledOnceWith('testing', output);
        });


    });

});