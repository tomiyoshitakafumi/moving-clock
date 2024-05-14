Q. ^(a|aa)+$ といった文字列が入力されたと考えよう。 この正規表現が "
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!" といった文字列にマッチするか調べようとするとどうなるだろうか。

A. a|aaはaがマッチするとaaは評価されない。しかし最後が!なのでマッチをせず全部のケースを網羅すると予想される。

バックトラック
https://ja.javascript.info/regexp-catastrophic-backtracking