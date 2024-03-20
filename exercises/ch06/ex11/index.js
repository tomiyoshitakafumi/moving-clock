let p = {
    x: 1.0,
    y: 1.0,

    get r() {
        if (isNaN(this.x) || isNaN(this.y)) {
            throw new Error("XかYがNaN")
        }
        return Math.hypot(this.x, this.y);
    },
    set r(newvalue) {
        let oldvalue = Math.hypot(this.x, this.y);
        let ratio = newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },

    get theta() {
        return Math.atan2(this.y, this.x);
    }
};

