import { toType, getTypedValue, getStringValue } from '../src/components/form/JsonInput/utils';

describe('utils.js', () => {
    it('toType provides correct type of argument', () => {
        expect(toType([])).toEqual('array');
        expect(toType({})).toEqual('object');
        expect(toType(false)).toEqual('boolean');
        expect(toType('test')).toEqual('string');
        expect(toType(6.4)).toEqual('number');
        expect(toType(null)).toEqual('null');
        expect(toType(undefined)).toEqual('undefined');
    });

    it('getStringValue provides string value of argument', () => {
        expect(getStringValue([])).toEqual('[]');
        expect(getStringValue({})).toEqual('{}');
        expect(getStringValue(false)).toEqual('false');
        expect(getStringValue('test')).toEqual('test');
        expect(getStringValue(6.4)).toEqual('6.4');
        expect(getStringValue(null)).toEqual('null');
        expect(getStringValue(undefined)).toEqual('undefined');
    });

    it('getTypedValue provides typed value of string argument', () => {
        expect(getTypedValue('[]')).toEqual([]);
        expect(getTypedValue('{}')).toEqual({});
        expect(getTypedValue('false')).toEqual(false);
        expect(getTypedValue('test')).toEqual('test');
        expect(getTypedValue('6.4')).toEqual(6.4);
        expect(getTypedValue('null')).toEqual(null);
        expect(getTypedValue('undefined')).toEqual(undefined);
    });
});
