let sym = Symbol("a");
let sym2 = Symbol("a");
let object = {};
object[sym] = 1;
object[sym2] = 2;

console.log(object[sym]);
console.log(object[sym2]);


let symfor = Symbol.for("a");
let symfor2 = Symbol.for("a");

let objectfor = {};
objectfor[symfor] = 3;
// 4で上書きされる
objectfor[symfor2] = 4;

console.log(objectfor[symfor]);
console.log(objectfor[symfor2]);