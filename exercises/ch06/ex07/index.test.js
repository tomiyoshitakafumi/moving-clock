import { assign } from "./index.js";

describe("assign", () => {
    test("重複なしで合成", () => {
        const obj1 = {a: 1, b: 2};
        const obj2 = {c: 3, d: 4};
        const result = assign(obj1, obj2);
        expect(result).toEqual({a: 1, b: 2, c: 3, d: 4});
    });

    test("重複ありの場合は上書き", () => {
        const obj1 = {a: 1, b: 2};
        const obj2 = {b: 3, c: 4};
        const result = assign(obj1, obj2);
        expect(result).toEqual({a: 1, b: 3, c: 4});
    });

    test("空", () => {
        const result = assign();
        expect(result).toEqual({});
    });
});
