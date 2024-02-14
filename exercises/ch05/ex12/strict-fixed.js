// //withが使える
// let obj = {x: {y: 1}};
// with (obj.x.y) {
// }
let obj = {x: {y: 1}};
let o = obj.x;

// // グローバルのプロパティに追加
// a=3;
// console.log(a);
//

let a = 3;
console.log(a);


// // eval内で宣言したものがスコープ外から使える。
// eval("let c =2;");
// console.log(c);
//
let c = 2;
console.log(c);


// // オブジェクトリテラルで同じ名前のプロパティを定義できる。
// let e = {x:2,x:3};
//
let symbol1 = Symbol("x");
let symbol2 = Symbol("x");
let e = {symbol1: 2, symbol2: 3};
// // 関数内で同じ名前のパラメータを宣言できる
// function f(){
//     let a;
//     let a;
// }
//

let symbol3 = Symbol("x");
let symbol4 = Symbol("x");

function f() {
    let symbol3;
    let symbol4;
}
