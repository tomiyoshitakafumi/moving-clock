// 未動作
//CSPに阻まれてうまくアップロードができなかった


import express from 'express';
import multer from 'multer';
import path from 'path';
import url from 'url';

const app = express();
const PORT = 8000;

// ファイルパスの設定
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "index.html");

// Multerの設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'");

  const originalFilePath = path.join(__dirname, 'uploads', req.file.filename);
  // const resizedFilePath = path.join(__dirname, 'uploads', 'resized-' + req.file.filename);
  // ここでwokerを使いたかった
  // const worker = new Worker('./worker.js', {
  //   workerData: { originalFilePath, resizedFilePath }
  // });

  
  res.send(`<!doctype html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <title>画像アップロード</title>
    </head>
    <body>
      <h1>画像がアップロードされました</h1>
      <h2>元画像</h2>
      <img src="/uploads/${req.file.filename}">
      <h2>フィルタ適用</h2>
      <img src="/uploads/${}">
    </body>
    </html>`);
});

app.get('*', (req, res) => {
  res.sendFile(filePath);
});

app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});