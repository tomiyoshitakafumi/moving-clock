問題 13.1 で非同期処理について学んだあなたは「時間のかかる同期関数があるならば、非同期関数に変換して適宜 await
すればいいのではないか」と思いついた。
それでは以下のコードを実行すると何が出力されるか予想し実際に確認しなさい。 また「マイクロタスク」について調査し、この用語を用いて理由を説明しなさい。

```js

setTimeout(() => console.log("Hello, world!"), 1000);

async function longRunningButAsyncFunction() {
    while (true) {
    // NOTE: ループの中で凄く時間のかかる処理 (大きい行列の処理とか...) を実行していると想像して下さい。
    // (適当な値で await するのが目的であり null に理由はない)
    await null;
    }
}

longRunningButAsyncFunction();
```

分解すると(awaitをなくしてもHelllo,wrold!が出ないため関係ないとして除去する。)

```js

setTimeout(() => console.log("Hello, world!"), 1000);
new Promise((resolve, reject) =>{
    try {
        resolve(function() {
            while(true){}
            return  
        }());
    }
    catch(e) {
        reject(e);
    }
});
```

Promise内部のfunction()は即時実行関数であるため、その中でwhile(true)
が実行される。しかしこの関数の評価は終わらないため、この評価が終わるまで次のマイクロタスク(setTimeout)
が実行されず、Hello,world!が出力されない。

