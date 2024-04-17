export class Warrior {
    constructor(atk) {
        this.atk = atk;
    }

    attack() {
        return this.atk * 2;
    }
}

export class Mage extends Warrior {
    constructor(atk, mgc) {
        super(atk);
        this.mgc = mgc;
    }

    attack() {
        return this.atk + this.mgc;
    }
}

export function Warrior2(atk) {
    this.atk = atk;
}

Warrior2.prototype.attack = function () {
    return this.atk * 2;
}

export function Mage2(atk, mgc) {
    this.mgc = mgc
    // warrior2のコンストラクタ関数をMage2のインスタンスで呼び出す
    Warrior2.call(this, atk);
}

Mage2.prototype = Object.create(Warrior2.prototype);
Mage2.prototype.constructor = Mage2;
Mage2.prototype.attack = function () {
    return this.atk + this.mgc;
}
