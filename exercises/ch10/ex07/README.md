# date-fns

https://github.com/date-fns/date-fns/blob/main/src/index.ts
src下に機能ごとにモジュールが分けられておりその機能のフォルダにテストコードが書かれている。クラスではなく関数がエクスポートされている。
そのため必要な機能のみをインポートすることが出てきてパフォーマンスの最適化を行っている。

# Luxon

https://github.com/moment/luxon/blob/master/src/interval.js
date-fnsと違いsrc下にテストコードが入っておらずsrcとは別のtestフォルダにまとまっている
また機能ごとにjsファイルで分かれてインポート&エクスポートされている。

# Day.js

date-fnsはsrc直下に機能ごとのフォルダがあったらDay.jsはsrc/pluginフォルダ下に機能ごとのフォルダがある構造になっている。testフォルダはLuxonと同じ