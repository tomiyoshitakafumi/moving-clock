import { pow, pow2 } from './index.js';

describe('', () => {
    test('pow', () => {
        expect(pow(2, 3)).toBe(8);
        expect(pow(-3, 3)).toBe(-27);
        expect(pow(2, 0)).toBe(1);
    });
    test('pow2', () => {
        expect(pow2(2, 3)).toBe(8);
        expect(pow2(-3, 3)).toBe(-27);
        expect(pow2(2, 0)).toBe(1);
    });
});