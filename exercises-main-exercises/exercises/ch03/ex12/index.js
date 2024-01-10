let obj1 = {x: 1};
obj1.y = 2;
console.log(obj1);
let obj2 = {x: 1, y: 2};
console.log(obj1 === obj2);


export function equals(a, b) {
    // isSameObject(a,b)でも可
    return JSON.stringify(a) === JSON.stringify(b);
}