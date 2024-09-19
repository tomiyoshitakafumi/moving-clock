* index.js でdocument.cookie プロパティを console.logで表示する
sid SamSite Pathがない　認証がうまくcookieに保存されてない?
  (しかしサーバー側ではreq.headers.cookieには保存されている)
* ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する
  sid	129d743a-6981-4eac-9357-f8a1e5cfa9dd
* ToDo アプリのタブをリロードする 
同じ値が表示される
* 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する 
同じ値が表示される
* シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する
  別のsidが表示される
* http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する
別のsidが表示される