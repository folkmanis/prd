import { TestScheduler } from 'rxjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { log } from './log';

describe('it should output to console', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should not change stream', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const e1 = cold(' abc-|');
      const expected = 'abc-|';

      expectObservable(e1.pipe(log('testing'))).toBe(expected);
    });
  });

  it('should output to console', () => {
    const output = 'txt';

    vi.spyOn(console, 'log').mockReturnValue(undefined);

    testScheduler.run(({ cold, expectObservable, flush }) => {
      expectObservable(cold('a|', { a: output }).pipe(log('testing'))).toBe(
        '  a|',
        { a: output },
      );

      flush();
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('testing', output);
    });
  });
  it('should output predicate to console', () => {
    const input = 3;
    const output = 6;
    const predicate = (x: number) => x * 2;
    vi.spyOn(console, 'log').mockReturnValue(undefined);

    testScheduler.run(({ cold, expectObservable, flush }) => {
      expectObservable(
        cold('a|', { a: input }).pipe(log(predicate, 'testing')),
      ).toBe('  b|', { b: input });

      flush();
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('testing', output);
    });
  });
});
