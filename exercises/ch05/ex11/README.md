初めにデバッグしたい行の末尾にdebuggerを追加する。`if (o === undefined) debugger;`
次にターミナル上で`node inspect 〇〇.js`とデバッグ状態で起動をおこなう。
そしてdebug> c処理をすることでdebuggerを立てたところまで実行される。