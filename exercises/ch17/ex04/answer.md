Q. npm install すると作成される package-lock.json はどのような役割を持つのか。 また、リポジトリにコミットすべきか、について説明しなさい。

package-lock.jsonとはnpm installでpackege.jsonを元にインストールされたパッケージの依存関係を含めたバージョンやnode_modulesの構造が記載される。

リポジトリにコミットして管理するべき。
npm ciコマンドやnpm installで使用して固定したパッケージをインストールしたい場合にpackage-lock.jsonを参照するため。packege.jsonだけだと依存先のバージョンが変わってしまう。

[参考](https://qiita.com/sugurutakahashi12345/items/1f6bb7a372b8263500e5)