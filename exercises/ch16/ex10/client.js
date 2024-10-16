import http from "http";
import fs from "fs";
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "source.html"); 
console.log(filePath);

// NOTE: file.txt の内容をアップロード
fetch("http://localhost:8000/upload/replace.html", {
    method: "PUT",
    body: fs.createReadStream(filePath),
    duplex: "half",
}).then(response => {
    if (response.ok) {
        console.log('File uploaded successfully');
    } else {
        console.error('File upload failed', response.statusText);
    }
});