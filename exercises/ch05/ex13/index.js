export function* Fibo() {

    let f = [];
    yield f[0] = 1;
    yield f[1] = 1;
    for(let i=2;true;i++){
        yield  f[i] = f[i - 1] + f[i - 2];
    }
}
// export function FiboFor() {
//     let f = [];
//     f[0] = 1;
//     f[1] = 1;
//     for (let i = 2; i < 10; i++) {
//         f[i] = f[i - 1] + f[i - 2];
//     }
//     return f;
// }