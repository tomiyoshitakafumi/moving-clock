import { bitCount } from "./index.js";

describe("", () => {
  it("bitCount", () => {
    expect(bitCount(0b101)).toEqual(2);
  }); 
  it("bitCount", () => {
    expect(bitCount(0b11111)).toEqual(5);
  })
  it("bitCount", () => {
    expect(bitCount(0)).toEqual(0);
  });
});
