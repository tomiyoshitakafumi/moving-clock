export function fibonacciSequence() {
    let x = 0, y = 1;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let result = y;
            [x, y] = [y, x + y];
            return {value: result};
        }
        //returnとthworwはあってもいい
        //厳密にやるならreturnが呼ばれたら終了フラグでdoneをtrueにした方が安全
    }
}

// function* fibonacciSequence() {
//     let x = 0, y = 1;
//     for(;;) {
//         yield y;
//         [x, y] = [y, x+y]; // 分割代入を行っている。
//     }
// }