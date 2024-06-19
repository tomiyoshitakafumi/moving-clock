```js
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}
補足:anyは最初に解決されたPromiseを返す。またPromise.anyが完了してもwait2は動き続けるためvを書き換えている
42,100
図解:
      wait1
      |----|
          log42
      　　  |-|
              wait2
              |--------|
                        log100
                        |-|
      wait2
      |--------|
                v=100書き込み
                |-|
                    
          
async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}
補足:
[A,B,C]
図解:
        wait3
        |------------|
                     logA
                     |-|
        wait2
        |--------|
                  logB
                  |-|
        wait1
        |----|
              logC
              |-|
        log[A,B,C]
        |-|


async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}
補足:いずれかが拒否されるとすぐにPromiseが拒否されて次の実装に行くか、all内のPromiseは解決して満たされるまで動く
Y,42,B,0
図解:
        wait3
        |------------|
                     v=0書き込み
                     |-|
        wait2
        |--------|
                 logB
                 |-| 
        wait1
        |----|
             errY
             |-|
               log42
               |-|     
                    wait3
                    |------------|
                                 log0
                                 |-|

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}
補足:
0,1,2,3,4,COMPLETED
図解:
    wait(5000)
    |------------|
                 log0
                 |-|
                    wait(4000)
                    |------------|
                                   log1
                                   |-|
                                      wait(3000)
                                      |------------|
                                                     log2
                                                     |-|
                                                        wait(2000)
                                                        |--------|
                                                                  log3
                                                                  |-|
                                                                     wait(1000)
                                                                     |----|
                                                                           log4
                                                                           |-|
                                                                              logCOMPLETED
                                                                              |-|

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}
補足:waitを待たない　先に評価されてしまう
COMPLETED,4,3,2,1,0 
図解:
    wait(5000)
    |---------------|
                    log0
                    |-|
    wait(4000) 
    |--------------|
                   log1
                   |-|
    wait(3000)
    |------------|
                 log2
      　         |-|
    wait(2000)
    |--------|
             log3
           　|-|
    wait(1000)
    |----|
         log4
         |-|
　   logCOMPLETED
     |-|

async function i6() {
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}
補足:
4,3,2,1,0,COMPLETED
図解:
    wait(5000)
    |----------------|
                     log0
                     |-|
                       logCOMPLETED
                       |-|
    wait(4000)
    |--------------|
                   log1
                   |-|
    wait(3000)
    |------------|
                 log2
                 |-|
    wait(2000)
    |--------|
             log3
             |-|
    wait(1000)
    |----|
         log4
         |-|


async function i7() {
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
補足:両方の値が+されるため8になる
8
図解:
    wait1
    |----|
         v読み込み
         |-|
           v書き込み
           |-|    
              wait2
              |--------|
                        v読み込み
                       |-|
                         v書き込み
                         |-|
                           wait2
                           |--------|
                                    v読み込み
                                    |-| 
                                      v書き込み   
                                      |-|       
                                        wait2
                                        |--------|
                                                 v読み込み
                                                 |-|
                                                   v書き込み
                                                   |-|
                                                     wait2
                                                     |--------|
                                                              v読み込み
                                                              |-|
                                                                 log10
        　                                                       |-|
    v読み込み
    |-|
      v書き込み
      |-|
        wait2
        |--------|
                  v読み込み
                 |-|
                   v書き込み
                   |-|
                     wait2
                     |--------|
                              v読み込み
                              |-|
                                v書き込み
                                |-|
                                   wait2
                                  |--------|
                                           v読み込み
                                           |-|
                                             v書き込み
                                             |-|
                                            　 wait2
                                               |--------|
             
async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
補足:(意図しない挙動だった)p2の書き込みがp1の書き込みに上書きされてしまう
5
図解:
    wait1
    |----|
         v読み込み
         |-|
           wait2
           |--------|
                     v書き込み
                    |-|
                      v読み込み
                      |-|    
                         wait2
                        |--------|
                                v書き込み
                                 |-|
                                   v読み込み
                                   |-|
                                     wait2
                                     |--------|
                                              v書き込み
                                              |-| 
                                                v読み込み   
                                                |-|       
                                                  wait2
                                                  |--------|
                                                           v書き込み
                                                           |-|
                                                             v読み込み
                                                             |-|
                                                               log8
                                                               |-|
    v読み込み
    |-|
      wait2
      |--------|
               v書き込み
               |-|
                 v読み込み
                 |-|
                   wait2
                   |--------|
                            v書き込み
                            |-|
                              v読み込み
                              |-|
                                 wait2
                                |--------|
                                         v書き込み
                                         |-|
                                           v読み込み
                                           |-|
                                              wait2
                                             |--------|
                                                      log5
                                                      |-|
```