export const pow = (x, n) => {
    if (n === 0) return 1;
    return x * pow(x, n - 1);
}
export const pow2 = (x, n) => {
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}
//logNでできるらしい
// export const pow = (x, n) => {
//     if (n === 0) return 1;
//    偶数の時は、n/2の累乗を2つに分けて掛け算する ex:x^6 = (x^2)^3
//     if (n % 2 === 0) {
//         const y = pow(x, n / 2);
//         return y * y;
//     奇数の時は、n-1の累乗を計算して、xを掛ける ex:x^7 = x * x^6
//     } else {
//         return x * pow(x, n - 1);
//     }
// }