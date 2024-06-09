import { getPrimeNumber } from "./index";

it("primeNumber", () => {
    let prime = getPrimeNumber();
    expect(prime.next().value).toBe(2);
    expect(prime.next().value).toBe(3);
    expect(prime.next().value).toBe(5);
    expect(prime.next().value).toBe(7);
    expect(prime.next().value).toBe(11);
});
