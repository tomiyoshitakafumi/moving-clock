import fs from 'fs';
import iconv from 'iconv-lite';

let source = fs.createReadStream('./ch16/ex04/hello.txt');
let converterStream = iconv.decodeStream('shift_jis');
source.pipe(converterStream)/*.on('data', function (str) {;とパイプ内でやるよりpipeをつなげたほうが見やすいのでよい*/
// source.on('data', function (str) {
//     console.log(str); 
// });
converterStream.on('data', function (str) {
    console.log(str); 
});
