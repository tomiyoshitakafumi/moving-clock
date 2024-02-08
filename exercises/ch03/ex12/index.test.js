import { equals } from "./index.js";

test("同じオブジェクト", () => {
    let a = {a: 1, b: 2};
    expect(equals(a, a)).toBe(true);
});
test("同じ内容だが別のオブジェクト", () => {
    let a = {a: 1, b: {c: 2}};
    let b = {a: 1, b: {c: 2}};
    expect(equals(a, b)).toBe(true);
});
test("別の内容のオブジェクト", () => {
    let a = {a: 1, b: {c: 2}};
    let b = {a: 1, b: {c: 3}};
    expect(equals(a, b)).toBe(false);
});
