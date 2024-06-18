```js
async function h1() {
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}
予想: A, B, C

function h2() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}
予想:X


function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}
予想:X (関数がPromiseになるだけ)

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
予想: asyncは以下の関数なため先頭をキャッチする。
// function f(x) {
//     return new Promise(function(resolve, reject) {
//         try {
//             resolve((function(x) { /* 関数本体 */ })(x));
//         }
//         catch(e) {
//             reject(e);
//         }
//     });
// }
結果:
```