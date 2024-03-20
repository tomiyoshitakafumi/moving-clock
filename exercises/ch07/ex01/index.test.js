import { addmatrix, minusmatrix } from "./index.js";

describe("7.1", () => {
    test("加算", () => {
        let x = [
            [1, 2],
            [3, 4],
        ];
        let y = [
            [5, 6],
            [7, 8],
        ];
        expect(addmatrix(x, y)).toEqual([[6, 8], [10, 12]]);
    });
    test("減算", () => {
        let x = [
            [1, 2],
            [3, 4],
        ];
        let y = [
            [5, 6],
            [7, 8],
        ];
        expect(minusmatrix(x, y)).toEqual([[-4, -4], [-4, -4]]);
    });
});
