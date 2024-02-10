import { add } from "./index.js";

let plus = {realNum:3,imaginaryNum:333};
let minus = {realNum:4,imaginaryNum:444};

describe("", () => {
  it("add", () => {
    expect(add(plus,plus)).toBe({realNum:6,imaginaryNum:666});
  });
});
