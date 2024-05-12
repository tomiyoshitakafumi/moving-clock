* none
  p276で使用されているmodulesオブジェクトが__webpack_modules__で[sets.js]などが[moduleId]となっている。
  さらに__webpack_module_cache__とキャッシュ取っているがそこまでアクセス速度に影響がある?
  __webpack_require__関数を新たにバンドルとして生成してそれをrequierの変わりに使用している。
* dev
  オブジェクト名などはnoneと同じ
  evalを使用して実行している。
* prod
  class名など容量削減が行われている。オブジェクトtのプロパティ名が数値になっている。800や724など
  noneやdevと比較してコメントがない