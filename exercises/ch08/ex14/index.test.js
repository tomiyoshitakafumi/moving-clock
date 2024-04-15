import { any, catching } from './index.js';

describe('', () => {
    test('any', () => {
        const isNonZero = any((n) => n > 0, (n) => n < 0);
        expect(isNonZero(-1)).toBe(true);
        expect(isNonZero(10)).toBe(true);
        expect(isNonZero(0)).toBe(false);
    });
    it('catching', () => {

        const safeJsonParse = catching(JSON.parse, (e) =>
            e.toString());
        expect(safeJsonParse('{"a": 1}')).toEqual({a: 1});
        expect(safeJsonParse('{"a": 1')).toMatch(/SyntaxError:/);

    });
});