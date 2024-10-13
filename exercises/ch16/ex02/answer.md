Q. 主にクラウド上で動作するプログラムは、いわゆる Graceful Shutdown という動作が求められ、上記のような処理が必要な場合がある。Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か書きなさい。


Graceful Shutdownとは
* 進行中のリクエストを完了させてから、サーバーを停止します
* 新しいリクエストは受け付けません
* リソースを適切に解放し、データの整合性を維持します
[参考](https://qiita.com/wakuto-o-ga/items/130efd1510fdf0787829)

A. 停止する際にまずはSIGTERMを送信して終了の合図を出す
もしデフォルト値の30秒待機してもプロセスが終了しない場合は強制SIGKILLのシグナルが出で終了される。

[参考](https://link-and-motivation.hatenablog.com/entry/2022/09/29/090000)
