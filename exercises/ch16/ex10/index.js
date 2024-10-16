// これは指定されたディレクトリからファイルを提供するシンプルで静的なHTTP
// サーバ。また、受信したリクエストをエコーする特別な/test/mirror
// エンドポイントも実装している。これは、クライアントをデバッグする際に便利。
import http from "http";
import fs from "fs";
import url from "url";
import path from "path";
// 指定されたポートで待ち受けるHTTPサーバを介して、
// 指定されたルートディレクトリのファイルを提供する。
function serve(rootDirectory, port) {
    let server = new http.Server(); // 新しいHTTPサーバを作成する。
    server.listen(port); // 指定されたポートで待ち受ける。
    console.log("Listening on port", port);
    // リクエストが届いたら、この関数で処理を行う。
    server.on("request", (request, response) => {
        // リクエストURLのパス部分を取得する。その際、付加されている
        // クエリパラメータは無視する。
        let endpoint = url.parse(request.url).pathname;
        
        // endpointでpathとファイル名を分ける
        let trimPath = endpoint.substring(0, endpoint.lastIndexOf('/'));
        let fileName = endpoint.substring(endpoint.lastIndexOf('/') + 1);
        if (trimPath === "/upload" && request.method === "PUT") {
            //追加した場所
            // アップロードされたファイルを保存するためのストリーム
            const __filename = url.fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.join(__dirname, fileName);
            const writeStream = fs.createWriteStream(filePath);
            request.pipe(writeStream);

            writeStream.on('close', () => {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end('File uploaded successfully');
            });
            writeStream.on('error', (err) => {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Error uploading file');
                console.error(err);
            })
        }

       else if (endpoint === "/test/mirror") {
            // レスポンスヘッダを設定する。
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            // レスポンスのステータスコードを指定する。
            response.writeHead(200); // 200 OK
            // レスポンスボディの最初はリクエスト。
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion
                }\r\n`);
            // リクエストヘッダを出力する。
            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
            }
            // ヘッダの末尾に空行を追加する。
            response.write("\r\n");
            // 次に、リクエストボディをレスポンスボディにコピーする必要がある。
            // 両方ともストリームなので、パイプを使うことができる。
            request.pipe(response);
        }
        // それ以外の場合は、ローカルディレクトリからファイルを提供する。
        else {
            // エンドポイントをローカルファイルシステムのファイルにマッピングする。
            let filename = endpoint.substring(1); // 最初の/を取り除く。
            // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供する
            // ことになり、セキュリティホールになるから。
            filename = filename.replace(/\.\.\//g, "");
            // 次に、相対パスを絶対パスに変換する。
            filename = path.resolve(rootDirectory, filename);
            // 拡張子に基づいて、ファイルのコンテンツタイプを推測する。
            let type;
            switch (path.extname(filename)) {
                case ".html":
                case ".htm": type = "text/html"; break;
                case ".js": type = "text/javascript"; break;
                case ".css": type = "text/css"; break;
                case ".png": type = "image/png"; break;
                case ".txt": type = "text/plain"; break;
                default: type = "application/octet-stream"; break;
            }
            let stream = fs.createReadStream(filename);
            stream.once("readable", () => {
                // ストリームが読み込めるようになったら、Content-Typeヘッダと
                // 200 OKステータスを設定する。そして、ファイル読み出し
                // ストリームをレスポンスにパイプする。ストリームが終了すると、
                // パイプは自動的にresponse.end()を呼び出す。
                response.setHeader("Content-Type", type);
                response.writeHead(200);
                stream.pipe(response);
            });
            stream.on("error", (err) => {
                // ストリームを開こうとしてエラーが発生した場合、
                // そのファイルはおそらく存在しないか、読めないと思われる。
                // エラーメッセージをプレーンテキストで記述して、
                // 404 Not Foundレスポンスを送信する。
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(404);
                response.end(err.message);
            });
        }
    });
}

// コマンドラインから起動された場合は、serve()関数を呼び出す。
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);

//node ch16/ex10/index.js ch16/ex10/replace.html 8000 で取得(なぜか文字化け)
//node ch16/ex10/client.jsでアップロード source.htmlをreplace.htmlにアップロード
