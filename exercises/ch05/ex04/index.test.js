import { FiboDoWhile, FiboFor, FiboWhile } from "./index.js";

describe("while文での✅", () => {
    it("", () => {
        expect(FiboWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);

    });
    it("dowhile文での✅", () => {
        expect(FiboDoWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);

    });
    it("for文での✅", () => {
        expect(FiboFor()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);

    });
})
