export default class Mulpoint {
    constructor(x) {
        this.x = x;
    }

    mul(n) {
        return new Mulpoint(this.x * n);
    }
}

// export  class qq {
//     constructor(x) {
//         this.x = x;
//     }

//     mul(n) {
//         return new qq(this.x * n);
//     }
// }