npx webpack でdistに生成
npx http-server 
http://127.0.0.1:8080/ex05/dist/

Q. バンドルしたコードと元のコードを比較し、どのような処理が行われたかを確認しなさい。
* use strictが明示的に宣言
* モジュールが__webpack_modules__オブジェクトでラップされて__webpack_requier__関数で使用されている。
evalでソースマップ?
キャッシュもしていそう
Q. バンドル前後それぞれのコードを利用するページをローカルサーバで配信してブラウザから閲覧できるようにしなさい。
npx http-server 
http://127.0.0.1:8080/ex05/dist/

Q. 開発者ツールで ネットワーク タブを開き、スクリプトのダウンロード時間、ページの読み込み完了時間について比較しなさい。

* dist bundle.js ietabapi_wp.jsが読み込まれ
容量 257B + 3.9kB
Finish 61ms DOMContentLoaded 67ms Load 152ms
* index.js ietabpi_wp.js indexUpdateGrid.js indexRenderGrid.js 
Finish 69 ms DOMContentLoaded 77 ms(DOM構成)  Load 176ms(画像とか)
容量は同じっぽい
[Website response time: Difference between `Load` and `Finish`]https://stackoverflow.com/questions/30266960/website-response-time-difference-between-load-and-finish