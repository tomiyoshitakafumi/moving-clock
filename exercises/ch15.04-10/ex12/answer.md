Q. Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい (ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。
A. ブラウザリロードするとHTTP ERROR 404が発生する。
hashchangeはRequestURLがhttp://192.168.2.104:8080/ch15.04-10/ex11/で200okが返ってくる。一方でpushStateはhttp://192.168.2.104:8080/ch15.04-10/ex12/allで 404 Not Foundが帰ってきている
これはhashchange存在しないidを指定しているためindex.htmlが表示されているからであり、pushStateは存在しないファイルallを指定しているため404エラーが発生している。
Q. ここまでの例は serve コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。 サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。
A. 2パターンある
①ファイルパスではなくidにすればよいのでは?
window.history.pushState(null, "", "/ch15.04-10/ex12/all")→window.history.pushState(null, "", "/ch15.04-10/ex12/#all")
②すべてのURLパスに対してHTMLファイルを返すように設定する(all、active、completed)
```