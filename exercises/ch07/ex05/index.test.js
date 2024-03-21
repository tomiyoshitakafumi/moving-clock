import { pop, push, shift, sort, unshift } from "./index.js";

describe("7.5", () => {
    const seq = [1, 2, 3, 4, 5];
    test("pop", () => {
        expect(pop(seq)).toEqual([1, 2, 3, 4]);
        
    });

    test("push", () => {
        expect(push(seq,6)).toEqual([1, 2, 3, 4, 5, 6]);
      
    });

    test("shift", () => {
        expect(shift(seq)).toEqual( [2, 3, 4, 5]);
       
    });

    test("unshift", () => {
        expect(unshift(seq,0)).toEqual([0, 1, 2, 3, 4, 5]);
     
    });

    test("sort", () => {
        expect(sort(seq,(a, b) => b - a)).toEqual( [5, 4, 3, 2, 1]);
    });
});