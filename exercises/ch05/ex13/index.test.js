import { Fibo } from "./index.js";

describe("", () => {

    it("fibo", () => {
        const i = Fibo();
        expect(i.next().value).toBe(1);
        expect(i.next().value).toBe(1);
        expect(i.next().value).toBe(2);
        expect(i.next().value).toBe(3);
        expect(i.next().value).toBe(5);
        expect(i.next().value).toBe(8);
        expect(i.next().value).toBe(13);
        expect(i.next().value).toBe(21);
        expect(i.next().value).toBe(34);
        expect(i.next().value).toBe(55);

    });
})
