
describe("", () => {
  it("null", () => {
    expect(changeEscapeSquence("あああ//い")).toBe("あああ////い");
    expect(changeEscapeSquence("あああい")).toBe("あああ////い");
    expect(changeEscapeSquence("あああい")).toBe("あああ////い");
    expect(changeEscapeSquence("あああい\n")).toBe("あああい\\n");
    expect(changeEscapeSquence("あああ//い")).toBe("あああ////い");
    expect(changeEscapeSquence("あああ//い")).toBe("あああ////い");
    expect(changeEscapeSquence("あああ//い")).toBe("あああ////い");
    expect(changeEscapeSquence("あああ//い")).toBe("あああ////い");
    expect(changeEscapeSquence("あああ//い")).toBe("あああ////い");
    expect(changeEscapeSquence("あああ//い")).toBe("あああ////い");
  });
});