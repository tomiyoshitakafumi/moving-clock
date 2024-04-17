import { instanceOf } from "./index.js";

describe("", () => {
    class Base {
    }

    class Middle extends Base {
    }

    class Derived extends Middle {
    }

    function Felise() {
    }

    function Conse() {
    }

    test("多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力する成功ケース", () => {
        const derived = new Derived();
        expect(instanceOf(derived, Base)).toBe(true);
    });

    test("継承関係にないインスタンスとクラスのコンストラクタを入力する成功ケース", () => {

        Felise.prototype = Conse.prototype;
        expect(instanceOf(new Conse(), Felise)).toBe(true);
    });

    test("継承していない失敗ケース", () => {
        class Maxe {
        }

        const base = new Base();
        expect(instanceOf(base, Maxe)).toBe(false);
    });
});