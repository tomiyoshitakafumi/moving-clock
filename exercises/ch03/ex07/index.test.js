import { equalArrays } from "./index.js";

describe("math", () => {
    it("equalArrays", () => {
        let a = function () {
            return 2;
        }
        // オブジェクトにないプロパティが呼び出されるとundefinedになるので===となる
        expect(equalArrays({}, {a})).toBe(true);
    });
});
