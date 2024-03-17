const object1 = {};

Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true,
});
object1.property1 = 77;
console.log(object1.property1);// 77
delete object1.property1;
console.log(object1.hasOwnProperty('property1')); // false
console.log(object1.propertyIsEnumerable('property1')); //false

const object2 = {};

Object.defineProperty(object2, 'property2', {
    value: 42,
    writable: false,
    enumerable: false,
    configurable: false,
});
object2.property2 = 77;
console.log(object2.property2); // 42
delete object2.property2;
console.log(object2.hasOwnProperty('property2')); // true
console.log(object2.propertyIsEnumerable('property2'));// false

const object3 = {};

Object.defineProperty(object3, 'property3', {
    value: 42,
    configurable: true,
});
console.log(object3.propertyIsEnumerable('property3'));// true
