import { add, div, mul, sub } from "./index.js";

let plus = {realNum:3,imaginaryNum:6};
let minus = {realNum:-4,imaginaryNum:-2};
let zero = {realNum:0,imaginaryNum:0};

describe("", () => {
  it("add", () => {
    expect(add(plus,plus)).toEqual({realNum:6,imaginaryNum:12});
  }); 
  it("add", () => {
    expect(add(plus,minus)).toEqual({realNum:-1,imaginaryNum:4});
  });  
  it("sub", () => {
    expect(sub(plus,plus)).toEqual({realNum:0,imaginaryNum:0});
  }); 
  it("sub", () => {
    expect(sub(plus,minus)).toEqual({realNum:7,imaginaryNum:8});
  });
  it("mul", () => {
    expect(mul(plus,minus)).toEqual({realNum:0,imaginaryNum:-30});
  });
  it("mul(zero)", () => {
    expect(mul(plus,zero)).toEqual({realNum:0,imaginaryNum:0});
  });
  it("div", () => {
    expect(div(plus,minus)).toEqual({realNum:-1.2,imaginaryNum:-0.9});
  });
  it("div(zero)", () => {
    expect(div(plus,zero)).toEqual(new Error("エラー"));
  });
});
