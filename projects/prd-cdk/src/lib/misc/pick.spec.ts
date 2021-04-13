import { pick } from './pick';

const testObj = {
    a: 1,
    b: 'string',
    c: () => { },
};

describe('it should pick properties from object', () => {

    it('should should create new object', () => {
        expect(pick(testObj)).not.toEqual(testObj);
    });

    it('should pick single property from object', () => {
        expect(pick(testObj, 'a')).toEqual({ a: 1 });
    });

    it('should pick function type objects', () => {
        expect(pick(testObj, 'c')).toEqual({ c: testObj.c });
    });

});
