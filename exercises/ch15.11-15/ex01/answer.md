* index.js でdocument.cookie プロパティを console.logで表示する
> delimiter=parentheses; hasSecuresendMessage=false; hasSubject=false; inputRegex=; delimiterCategory=enclosure; subject=; stampType=nostamp; 
> useSenderMakeLeapsId=false; securesendMessage=; chapterdate=salesdate; remarks=false; externalIdIndex=0; documentTypeIndex=1; totalIndex=2; 
> documentNumberIndex=3; metaDataLinkMethod=externalId; ordernumber=false; chapter=normal; senderMakeLeapsId=; template=ja_JP_pro_4; 
> carryoveramount=false; useDenchoho=true; metaDataAcquireFormat=filename; openDetails=true; ai_user=32b0quSH4KV/BWt5R6i0jf|2024-04-17T01:40:32.578Z;
> intercom-device-id-s366peg0=eb82432a-7560-48a9-97fb-5765f9bc3152; ITEMS_PER_PAGE_COOKIE_NAME=10; DEFAULT_DIVISION_COOKIE_NAME=

sid SamSite Pathがない　認証がうまくcookieに保存されてない?

* ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する 
* ToDo アプリのタブをリロードする 
* 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する 
* シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する
* http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する