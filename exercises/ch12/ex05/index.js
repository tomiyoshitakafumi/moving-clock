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