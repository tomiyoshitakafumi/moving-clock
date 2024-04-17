import { Mage, Mage2, Warrior, Warrior2 } from './index.js';

describe("", () => {
    test("Warrior class", () => {
        const warrior = new Warrior(10);
        expect(warrior.attack()).toBe(20);
    });
    test("Mage class", () => {
        const mage = new Mage(10, 5);
        expect(mage.attack()).toBe(15);
    });
    test("Warrior2 function", () => {
        const warrior2 = new Warrior2(10);
        expect(warrior2.attack()).toBe(20);
    });
    test("Mage2 function", () => {
        const mage2 = new Mage2(10, 5);
        expect(mage2.attack()).toBe(15);
    });
});