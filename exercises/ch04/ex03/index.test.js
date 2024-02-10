import { add, sub } from "./index.js";

describe("", () => {
    it("sub", () => {
        expect(sub(3, 1)).toEqual(2);
    });
    it("sub", () => {
        expect(sub(-2, 1)).toEqual(-3);
    });
});
