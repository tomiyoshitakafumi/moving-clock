import { a, b, c } from './index.js';

describe('a', () => {
    test('5つのtest', () => {
        const result = a(5, 'test');
        expect(result).toEqual(['test', 'test', 'test', 'test', 'test']);
    });
    test('0つのtest', () => {
        const result = a(0, 'test');
        expect(result).toEqual([]);
    });

    test('5*5=25', () => {
        const result = b(5);
        expect(result).toBe(25);
    });
    test('0*0=0', () => {
        const result = b(5);
        expect(result).toBe(25);
    });

    // {now: new Date().getTime()}だと失敗するため数値のみ判定
    test('now', () => {
        const result = c();
        expect(result).toEqual({now: expect.any(Number)});
    });
});