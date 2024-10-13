Q. マルチスレッドとは
A. 1つのプログラムのアプリケーションのプロセスを複数のスレッドに分けて並行処理することをいう。
利点として
GUIの描写などメインスレッドの応答を早めたい時裏で重い処理を回して効率的にする(JSはシングルスレッドだが、ブラウザやnodeの非同期の環境のAPIを使って実現している)
行列の乗算のような数値計算などはマルチスレッドで高速化できる

デメリットは同じメモリを参照してスレッドセーフになってしまうバグが起こりやすい(見つけにくい)


Q. 次にフィボナッチ数を計算するmFib.jsをスレッド数を変更しながら実行し(*1)、 コンソール出力とOS機能(*2)で結果とスレッド数を確認しなさい。

自分のPC コア 12 
論理プロセッサ14
プロセッサ数の14が最速と思いきや20でも十分早かった
あと14プロセッサがあったが最大12個しか使われなかった(保留になっていた?)


A.  mFib.js 45 4で実行した
* Total execution time: 8.755s

mFib.js 45 6で実行した
* Total execution time: 9.395s

mFib.js 45 8で実行した
* Total execution time: 8.170s

mFib.js 45 8で実行した(2回目)
Total execution time: 7.846s

mFib.js 45 14
* Total execution time: 6.425s

mFib.js 45 20
* Total execution time: 6.187s

mFib.js  45 45
* Total execution time: 6.986s

[参考](https://docs.oracle.com/cd/E19683-01/816-3976/6ma7iosht/index.html)