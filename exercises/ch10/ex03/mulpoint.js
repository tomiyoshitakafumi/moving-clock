class Mulpoint {
    constructor(x) {
        this.x = x;
    }

    mul(n) {
        return new Mulpoint(this.x * n);
    }
}

module.exports = Mulpoint;