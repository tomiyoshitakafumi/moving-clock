let obj = {3: 0, 4: 0, "a": 0, "b": 0};
let obj2 = Object.create(obj);
obj2[3] = 0;
obj2[5] = 0;
obj2["a"] = 0;
obj2["c"] = 0;

Object.defineProperty(obj, 'd', {
    value: 0,
    enumerable: true,
});
Object.defineProperty(obj, 'f', {
    value: 0,
    enumerable: false,
});

for (let prop in obj2) {
    console.log(prop);
}
// 3 5 a c 4 b d 