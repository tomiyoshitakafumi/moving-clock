* 組み込み関数

```js
console.log(Array.prototype.push.toString());
```

function push() { [native code] }
これはネイティブコードで作られている

* 自作関数

```js
function f(a, b) {
    return a + b;
}
console.log(f.toString());
```

// function f(a, b) { return a + b; }