import { changeEscapeSquence, changeEscapeSquence2 } from "./index.js";

describe("if文での✅", () => {
    it("null", () => {
        expect(changeEscapeSquence(null)).toBe("\\0");
    });
    it("バックスペース", () => {
        expect(changeEscapeSquence("\u{0008}")).toBe("\\b");
    });
    it("水平タブ", () => {
        expect(changeEscapeSquence("\u{0009}")).toBe("\\t");
    });
    it("改行", () => {
        expect(changeEscapeSquence("\u{000A}")).toBe("\\n");
    });
    it("垂直タブ", () => {
        expect(changeEscapeSquence("\u{000B}")).toBe("\\v");
    });
    it("改頁", () => {
        expect(changeEscapeSquence("\u{000C}")).toBe("\\f");
    });
    it("復帰", () => {
        expect(changeEscapeSquence("\u{000D}")).toBe("\\r");
    });
    it("2重引用符", () => {
        expect(changeEscapeSquence("\u{0022}")).toBe('\\"');
    });
    it("アポストロフィ", () => {
        expect(changeEscapeSquence("\u{0027}")).toBe("\\'");
    });
    it("バックスラッシュが2箇所別々で", () => {
        expect(changeEscapeSquence("あ\\ああ\\い")).toBe("あ\\\\ああ\\\\い");
    });
    it("バックスラッシュが2つ", () => {
        expect(changeEscapeSquence("ああ\\\\あい")).toBe("ああ\\\\\\\\あい");
    });
})

describe("switch文での✅", () => {
    it("null", () => {
        expect(changeEscapeSquence2(null)).toBe("\\0");
    });
    it("バックスペース", () => {
        expect(changeEscapeSquence2("\u{0008}")).toBe("\\b");
    });
    it("水平タブ", () => {
        expect(changeEscapeSquence2("\u{0009}")).toBe("\\t");
    });
    it("改行", () => {
        expect(changeEscapeSquence2("\u{000A}")).toBe("\\n");
    });
    it("垂直タブ", () => {
        expect(changeEscapeSquence2("\u{000B}")).toBe("\\v");
    });
    it("改頁", () => {
        expect(changeEscapeSquence2("\u{000C}")).toBe("\\f");
    });
    it("復帰", () => {
        expect(changeEscapeSquence2("\u{000D}")).toBe("\\r");
    });
    it("2重引用符", () => {
        expect(changeEscapeSquence2("\u{0022}")).toBe('\\"');
    });
    it("アポストロフィ", () => {
        expect(changeEscapeSquence2("\u{0027}")).toBe("\\'");
    });
    it("バックスラッシュが2箇所別々で", () => {
        expect(changeEscapeSquence2("あ\\ああ\\い")).toBe("あ\\\\ああ\\\\い");
    });
    it("バックスラッシュが2つ", () => {
        expect(changeEscapeSquence2("ああ\\\\あい")).toBe("ああ\\\\\\\\あい");
    });
});