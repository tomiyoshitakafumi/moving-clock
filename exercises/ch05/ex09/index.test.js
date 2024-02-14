import { parse } from "./index.js";

describe("", () => {
    it("成功", () => {
        expect(parse('{"x": 2, "y": 3, "z": 4}')).toEqual({success: true, data: {x: 2, y: 3, z: 4}});

    });
    it("失敗", () => {
        expect(parse('{"x": 2, "y": 3')).toEqual({success: false, error: new Error('Invalid JSON input')});
    });
    it("失敗(空)", () => {
        expect(parse()).toEqual({success: false, error: new Error('Invalid JSON input')});
    });
})
