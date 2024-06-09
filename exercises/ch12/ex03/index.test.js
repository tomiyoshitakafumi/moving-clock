import { counter } from "./index";

it("countup", () => {
    let count = counter();
    expect(count.next().value).toBe(0);
    expect(count.next().value).toBe(1);
    expect(count.next().value).toBe(2);
    expect(count.throw().value).toBe(0);
    expect(count.next().value).toBe(1);
    expect(count.next().value).toBe(2);
});
