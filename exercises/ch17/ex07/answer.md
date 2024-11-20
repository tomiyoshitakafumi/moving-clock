Q. TypeScriptのトランスパイルは@babel/preset-typescriptやtscによって可能だが、それぞれの違いを調べなさい。
A. 
* @babel/preset-typescriptはbabelの機能でtsをjsに変換するトランスコンパイラ。しかしコード変換以外の方チェックはできないため型が不整合でも成功してしまう。
* tscはtypescriptからjavascriptのトランスコンパイラ。しかしトランスコンパイラの対象になるのはJavaScript構文だけでありPromiseなどの組み込みオブジェクトのトランスコンパイルはできない
なので両方使うのがベストプラクティス?
[参考](https://t-yng.jp/post/tsc-and-babel)
[組み込みオブジェクト一覧](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects)