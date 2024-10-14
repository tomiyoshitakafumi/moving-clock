import fs from 'fs';

const fileName = 'ch16/ex06/test.txt';
const newSize = 1000; 

fs.truncate(fileName, newSize, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`${newSize} バイトに拡張`);
});