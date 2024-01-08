import { fib } from "./index.js";

describe("math", () => {
  describe("fib", () => {
    it("fib(5)は5となるか", () => {
      expect(fib(5)).toBe(5);
    });

    it("fib(-1)はエラーとなるか", () => {
      expect(() => fib(-1)).toThrow("負の値が設定されています");
    });

    it("fib(50)は12586269025となるか", () => {
      expect(fib(50)).toBe(12586269025);
    });
  });
});
