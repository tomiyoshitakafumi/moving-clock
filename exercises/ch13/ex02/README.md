```js
function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}
  補足:
 wait(0).then(logA).then(errX); はエラーのPromise型が帰ってくるため
タスクの順番としてはfinallyが先なのでlogCが先に表示され終了し次第Promiseのthenへの引数への受け渡すマイクロタスクが実行される。
  図解:
      logC
      |-|
          wait3
        　||
            logA
            |-|
                errX
                |-|
       
       
function f4() {
// NOTE: f5 との比較用
   wait2()
       .then(() => {
           logA();
           return 40;
       })
       .then((value) =>
           wait(1000).then(() => {
               logB();
               return 100;
           })
       )
       .then((v) => log(v));
}
補足:
    最後のthenはlog(100)
図解:
    wait2
    |-------|
             logA
            |-|
                wait1000
                |----|
                     logB
                     |-|
                        log100
                        |-|



function f5() {
    // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
    wait2()
        .then(() => {
            logA();
            return 40;
        })
        .then(
            wait1().then(() => {
                logB();
                return 100;
            })
        )
        .then((v) => log(v));
}
補足:
    最後のthenはlog(40)
自分の想定と違う挙動だった
これは 
wait1().then(() => {
    logB();
    return 100;
})
が先に評価されたため
let a = wait2().then(() => {.....})
let b = a.then( ....)←値の評価が走る
let c = b.then((v) => log(v));
 wait2よりwait1のほうが短いためlogBが先に表示される
図解:
    wait2
    |-------|
            wait1
             |----|
                  logB
                  |-|
                     logA
                     |-| 
                    　   log40
               　　　     |-|



function f6() {
    // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか

    const p = wait1().then(logA);
    p.then(() => wait1()).then(logB);
    p.then(() => wait2()).then(logC);
}
補足:
wait1 wait2がほぼ同時に実行
図解:
    wait1
    |----|
         logA
         |-|
            wait1
            |----|
                 logB
                 |-|
            wait2
            |--------|
                     logC
                     |-|



function f7() {
    // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
    // (= 解決済みの Promise の then を呼び出すとどうなるか)
    const p = wait1().then(logA);
    wait2()
        .then(() => {
            return p.then(logB);
        })
        .then(logC);
}
        
補足:
wait1() wait2()がほぼ同時に実行
図解:
    wait1
    |----|
         logA
         |-|
    wait2
    |--------|
             logB
             |-|
                logC
                |-|

        
        
function f8() {
    // NOTE: f9, f10 との比較用
    wait1()
        .then(errX)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}
補足:

図解:
    wait1
    |----|
         errX
         |-|
            log(errX)
               |-|
                  logA
                  |-|


        
function f9() {
    // NOTE: f12 との比較用
    wait1()
        .then(() => 42)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}
補足:

図解:
    wait1
    |----|
        　errY
        　|-|
           　log(errY)
    　　　　　|-|
                logA
    　　　　　　　|-|



function f10() {
    // NOTE: then(r, c) と then(r).catch(c) は等しいか？
    wait1()
        .then(() => 42)
        .then(errY, (e) => log(e.message))
        .finally(logA);
}
補足:
エラーは発生するが2つめの2エラー用の引数には入らない&エラーで失敗
memo finallyの後にcatchを入れても動く。
図解:
    wait1
    |----|
        　errY
        　|-|
            logA
　　　　　　　|-|


function f11() {
    // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
    new Promise((resolve, reject) => {
        errX();
    }).catch((e) => log(e.message));
}
補足:
return new Promiseでは?
図解:
    errX
    |----|
         log(errX)
         |-|




function f12() {
    // new Promise 内だがコールバック関数で throw した場合は？
    new Promise((resolve, reject) => {
        setTimeout(() => errX(), 0);
    }).catch((e) => log(e.message));
}
補足:
return new Promiseでは? 
ここも自分の意図と違う挙動だった
catchはできなかった。
予想としてrejectが呼ばれてない状態でのエラーはPromiseの生成事態の失敗なのでPromiseの失敗とは異なる
図解:
    errX
    |----|
``` 

