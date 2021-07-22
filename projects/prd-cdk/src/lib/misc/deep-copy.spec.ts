import { deepCopy } from './deep-copy';

const sym = Symbol('key');

const testObj = {
    a: 1,
    b: 'string',
    c: () => { },
    [sym]: 1,
    d: {
        a: 1,
    }
};

describe('it should clone object', () => {

    it('should create new object', () => {
        expect(deepCopy(testObj)).not.toBe(testObj);
    });

    it('objects should contain the same values', () => {
        expect(deepCopy(testObj)).toEqual(testObj);
    });

    it('original object should not change', () => {
        const cp = deepCopy(testObj);
        cp.d.a = 5;
        expect(cp).not.toEqual(testObj);
    });

});
