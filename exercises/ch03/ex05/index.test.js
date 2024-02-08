import { replaceCRLFtoLF, replaceLFtoCRLF } from "./index.js";

describe("math", () => {
    it("LF -> CR+LF", () => {
        expect(replaceLFtoCRLF("ああ\nあ")).toBe("ああ\r\nあ");
    });
    it("CR+LF -> LF", () => {
        expect(replaceCRLFtoLF("ああ\r\nあ")).toBe("ああ\nあ");
    });
    it("変換しない", () => {
        expect(replaceCRLFtoLF("あああ")).toBe("あああ");
    });
});
