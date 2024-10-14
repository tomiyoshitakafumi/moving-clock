Q. 標準入力、標準出力、標準エラー出力、リダイレクト、パイプという単語について調べなさい
A
* 標準入力 (stdin): プログラムが外部からデータを受け取るための入力ストリーム。主にキーボード
* 標準出力 (stdout): プログラムが処理結果を出力するための出力ストリーム。コンソールやターミナルに表示される。ファイルに出力も可能
* 標準エラー出力 (stderr): エラーメッセージや警告メッセージを出力するための出力ストリーム。標準出力とは別に扱われる。
* リダイレクト: 標準入力、標準出力、標準エラー出力をファイルや他のストリームに変更する操作。>や>>を使って標準出力をファイルに書き込むことができる。
* パイプ: 一つのプログラムの標準出力を別のプログラムの標準入力として|を使って渡す機能。
[参考](https://envader.plus/course/1/scenario/1007)

Q. 実験: file は適当なファイルとし invalid-file は存在しないファイルとしなさい

node cat.mjs
予想 入力したものがそのまま
echo FOO | node cat.mjs
予想 FOO
node cat.mjs > output.txt
予想 入力したものがoutput.txtに保存(上書き) 
結果　入力時は追加　再度実行すると上書き
node cat.mjs file(text.txt)
予想　file内容が表示
node cat.mjs file > output.txt
予想　output.txtが出力
node cat.mjs invalid-file > output.txt
予想　出力されない
結果　エラー
node cat.mjs invalid-file 2> error.txt
予想 エラー