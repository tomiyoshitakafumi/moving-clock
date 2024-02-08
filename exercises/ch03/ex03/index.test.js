import { isChekingValue } from "./index.js";

describe("math", () => {
    describe("", () => {
        it("0.3 -0.2 =0.1と浮動小数点の誤差が考慮されているか", () => {
            expect(isChekingValue(0.3 - 0.2, 0.1)).toBe(true);
        });
        it("0.2 -0.1 =0.1と浮動小数点の誤差が考慮されているか", () => {
            expect(isChekingValue(0.2 - 0.1, 0.1)).toBe(true);
        });
        it("答えがおかしいコード", () => {
            expect(isChekingValue(0.2 - 0.1, 0)).toBe(false);
        });

    });
});
