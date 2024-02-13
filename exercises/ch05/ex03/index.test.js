import { isHolidayIf, isHolidaySwitch } from "./index.js";

describe("if文での✅", () => {
    it("", () => {
        expect(isHolidayIf("月")).toBe(false);
        expect(isHolidayIf("火")).toBe(false);
        expect(isHolidayIf("水")).toBe(false);
        expect(isHolidayIf("木")).toBe(false);
        expect(isHolidayIf("金")).toBe(false);
        expect(isHolidayIf("土")).toBe(true);
        expect(isHolidayIf("日")).toBe(true);
        expect(isHolidayIf("ああ")).toEqual(new Error("曜日エラー"));
    });

})

describe("switch文での✅", () => {
    it("", () => {
        expect(isHolidaySwitch("月")).toBe(false);
        expect(isHolidaySwitch("火")).toBe(false);
        expect(isHolidaySwitch("水")).toBe(false);
        expect(isHolidaySwitch("木")).toBe(false);
        expect(isHolidaySwitch("金")).toBe(false);
        expect(isHolidaySwitch("土")).toBe(true);
        expect(isHolidaySwitch("日")).toBe(true);
        expect(isHolidaySwitch("ああ")).toEqual(new Error("曜日エラー"));
    });

});