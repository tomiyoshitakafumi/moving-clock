// 1万回して成功→その次に5万回そうとしたら2331回目で失敗
// C10K問題に近しい1万台と大量のアクセスにより処理のボトルネックになっている?


import net from 'net';
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const request = data.toString();
    // requestの中身
    // POST / greeting HTTP / 1.1
    // Host: localhost: 8000　etc...
    const [header, body] = request.split('\r\n\r\n');
    const [requestLine, ...headers] = header.split('\r\n');
    const [method, path] = requestLine.split(' ');
console.log(method, path);
    if (method === 'GET' && path === '/') {
      const response = `
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label for="greeting">Greeting:</label>
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`;
      socket.write(response);
    } else if (method === 'POST' && path === '/greeting') {
      //Content-Type: application/x-www-form-urlencodedのbodyはURLエンコードと同じ形式なので(name=3&greeting=d)URLSearchParamsでパースできる
      const params = new URLSearchParams(body);
      const name = params.get('name');
      const greeting = params.get('greeting');
      const response = `
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting</title>
  </head>
  <body>
    <div>${greeting}, ${name}!</div>
  </body>
</html>
`;
      socket.write(response);
    } else  {
      const response = `
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=UTF-8

404 Not Found
`;
      socket.write(response);
    } 
    socket.end();
  });
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
});

export default server;