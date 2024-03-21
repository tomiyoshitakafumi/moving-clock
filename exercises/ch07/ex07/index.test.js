import { sort } from "./index.js";

test("sort", () => {
    expect(sort([1, 4, 3], (a, b) => b - a)).toEqual([4, 3, 1]);
    expect(sort([1, 4, 3], (a, b) => a - b)).toEqual([1, 3, 4]);
});