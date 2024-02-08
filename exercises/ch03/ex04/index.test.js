describe("math", () => {
    describe("Point", () => {
        it("💯の長さは2", () => {
            expect("💯".length).toBe(2);
        });
        it("uft-16とutf-32のコードポイント表現が同じunicodeであるか", () => {
            expect("\uD83D\uDCAF").toBe("\u{0001F4AF}");
        });

    });
});
