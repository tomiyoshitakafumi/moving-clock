import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("小数点を含む値合計値が正しいか", () => {
      expect(sum([1,2,3.1])).toBe(6.1);
    });

    it("配列が空の場合は正しいか", () => {
      expect(sum([])).toBe(0);
    });
  });

  describe("factorial", () => {
    it("4!は24となるか", () => {
      expect(factorial(4)).toBe(24);
    });

    it("-1!はエラーとなるか", () => {
      expect(() => factorial(-1)).toThrow("負の値が設定されています");
    });

    it("0!は1となるか", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});
