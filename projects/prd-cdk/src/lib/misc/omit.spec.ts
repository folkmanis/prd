import { omit } from './omit';

const sym = Symbol('key');

const testObj = {
    a: 1,
    b: 'string',
    c: () => { },
    [sym]: 1,
};

describe('it should pick properties from object', () => {

    it('should should create new object', () => {
        expect(omit(testObj)).not.toBe(testObj);
    });

    it('should leave single property from object', () => {
        expect(omit(testObj, 'b', 'c')).toEqual({ a: 1, [sym]: testObj[sym] });
    });


});
