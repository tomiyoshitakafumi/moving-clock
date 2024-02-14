const start = performance.now();
let obj = {x: {y: {z: 1}}};
obj.x.y.z;
const end = performance.now();
console.log(end - start);

const startWith = performance.now();
with (obj.x.y.z) {
}
const endWith = performance.now();
console.log(endWith - startWith);
