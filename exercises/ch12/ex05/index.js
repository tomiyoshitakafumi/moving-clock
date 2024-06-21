//動いていません
function* readLines(filePath) {

    const fs = require('fs');
    let fd = fs.openSync(filePath, "r");
    try {
        let buffer = Buffer.alloc(2);
        const state = fs.statSync(filePath);
        let result = Buffer.alloc(2);
        for (let i = 0; i <= state.size; i++) {
            fs.readSync(fd, buffer, 0, 2, 0);
            if (buffer.toString() === '\n') {
                yield result.toString();
                result = Buffer.alloc(2);
            } else {
                result.push(buffer);
            }
        }
        fs.closeSync(fd);
    } catch (err) {
        fs.closeSync(fd);
    }
}

// for (let i = 0; buffer !== ''; i++) {
//     fs.readSync(fd, buffer, i*16,2,i*16);
//     if (buffer.readUInt16LE(buffer.length - 2) === '/n') {
//         yield buffer;
//         buffer='';
//     }
// }
// let a = readLines('./test.txt');a
// console.log(a.next().value);

let a = readLines('./test.txt');
console.log(a.next().value);


// import fs from 'fs';
//
// function readData(filename) {
//     let fd = fs.openSync(filename);
//     try {
// // ファイルのヘッダを読み出す。
//         let header = Buffer.alloc(12); // 12バイトのバッファ。
//         fs.readSync(fd, header, 0, 12, 0);
// // ファイルのマジックナンバーを検証する。
//         let magic = header.readInt32LE(0);
//         // if (magic !== 0x31bfbbef) {
//         //     throw new Error("File is of wrong type");
//         // }
// // データのオフセットと長さをヘッダから取得する。
//         let offset = header.readInt32LE(4);
//         let length = header.readInt32LE(8);
// // そして、ファイルからそのデータのバイト列を読み出す。
//         let data = Buffer.alloc(12);
//         fs.readSync(fd, data, 0, 2, 4);
//         return data;
//     } finally {
// // 上記のコードで例外がスローされた場合でも、ファイルを必ずクローズする。
//         fs.closeSync(fd);
//     }
// }
//
// //PE形式　https://learn.microsoft.com/ja-jp/windows/win32/debug/pe-format
// console.log(readData('./test.txt').toString());