```js
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
```

予想
コンソールに出力される値
nm: false true
arrow: true false

結果
nm: false true
arrow: true false