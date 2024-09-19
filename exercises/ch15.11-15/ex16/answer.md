オリジン間リソース共有（CORS）について、以下の問いに答えなさい。
Q. クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい
A. 同一オリジンではないサイトからのリクエストを受け付けることで、GET, HEAD, POSTではないシンプルなリクエスト(プリフライトリクエスト)を受け付けてしまいCSRF攻撃を受ける可能性がある。また同一オリジンでないサイトへリクエストを送信できてしまうのでXSS攻撃を受ける可能性がある。
https://qiita.com/netebakari/items/41baa7e1d0b8d89f9d12
https://zenn.dev/musuke/scraps/ecca754603d656
2. クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい
   DELETE PUT POSTのようなリクエストは、ユーザーデータに影響を与える可能性があるためOPTIONメソッドによるHTTPリクエストを投げて安全かどうかをサーバー側で確認するため
   https://developer.mozilla.org/ja/docs/Web/HTTP/CORS#%E5%8D%98%E7%B4%94%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88