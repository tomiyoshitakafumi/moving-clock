import { p } from "./index.js";

describe("6.11", () => {
    test("極座標更新", () => {
        p.r = 4;

        expect(p.x).toBe(2.82842712474619);
        expect(p.y).toBe(2.82842712474619);
        expect(p.theta).toBe(0.7853981633974483);
    });
    test("XとYが0で極座標を更新した場合はNaNになる", () => {
        p.x = 0;
        p.y = 0;
        p.r = 2;

        expect(p.r).toBe(new Error("XかYがNaN"));
    });
});
