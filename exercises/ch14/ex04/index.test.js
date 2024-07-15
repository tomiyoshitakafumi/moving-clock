import { Primitive } from "./index.js";

describe('Hiragana class', () => {
    test('UTF-16 code 順', () => {
        const chars = [new Primitive('あ'), new Primitive('ば'), new Primitive('う'), new Primitive('え'), new Primitive('お')];
        chars.sort();
        expect(chars.map(char => char.char)).toEqual(['あ', 'う', 'え', 'お', 'ば']);
    });

    test('string', () => {
        const char = new Primitive('あ');
        expect(String(char)).toBe('あ');
    });

    test('TF-16 code number', () => {
        const char = new Primitive('あ');
        expect(Number(char)).toBe('あ'.charCodeAt(0));
    });
});