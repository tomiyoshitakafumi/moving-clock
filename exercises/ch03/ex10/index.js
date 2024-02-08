let object = {a: 1, b: 2};
let keyArray = [];
let valueArray = [];
for (const key in object) {
    keyArray.push(key);
    valueArray.push(object[key]);
}
console.log(`key一覧: ${keyArray}`);
console.log(`value一覧: ${valueArray}`);