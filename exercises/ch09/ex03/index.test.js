import { C1, C2 } from './index.js';

describe('', () => {
    test('C1', () => {
        const c1 = new C1();
        expect(c1.getX).toBe(42);
        expect(c1.x).toBeUndefined();
    });
    test('C2', () => {
        const c2 = C2();
        expect(c2.getx()).toBe(42);
        expect(c2.x).toBeUndefined();
    });
});
