//withが使える
let obj = {x: {y: 1}};
with (obj.x) {
}
// グローバルのプロパティに追加
a = 3;
console.log(a);

// eval内で宣言したものがスコープ外から使える。
eval("var c =2;");
console.log(c);

// オブジェクトリテラルで同じ名前のプロパティを定義できる。
let e = {x: 2, x: 3};

// 関数内で同じ名前のパラメータを宣言できる
function f() {
    let g;
    let h;
}
