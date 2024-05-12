const point = require('./pointDiscount.js');
const mul = require('./mulpoint.js');

console.log(point.discount(100, 10));
let p = new mul(10);
console.log(p.mul(2));