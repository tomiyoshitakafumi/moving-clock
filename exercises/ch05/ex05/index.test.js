import { deleteodd } from "./index.js";

describe("", () => {
    it("奇数偶数混合", () => {
        expect(deleteodd({x: 2, y: 3, z: 4})).toEqual({x: 2, z: 4});

    });
    it("奇数だけ", () => {
        expect(deleteodd({x: 1, y: 3})).toEqual({});

    });
    it("偶数だけ", () => {
        expect(deleteodd({x: 2, y: 4})).toEqual({x: 2, y: 4});

    });
    it("なにもなし", () => {
        expect(deleteodd({})).toEqual({});

    });
})
