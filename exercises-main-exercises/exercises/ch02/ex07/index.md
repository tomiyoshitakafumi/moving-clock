```
const c = a
b++
console.log(a, b, c);
```

0 1 0

```
const e = a++
b;

console.log(a, b, e);
```

1 1 0

このようなaの後置インクリメントかbの前置インクリメントかの違いによって出力される値が異なっている