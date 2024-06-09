import { fibonacciSequence } from "./index";

it("フィボナッチ数列", () => {
    const seq = fibonacciSequence();
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
    expect(seq.next().value).toBe(3);
    expect(seq.next().value).toBe(5);
});
