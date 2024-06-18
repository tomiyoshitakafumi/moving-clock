import * as fs from "node:fs";

//fsの〇〇はvoid

export function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

export function stat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        });
    });
}

//ex
function mkdir(path, options) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, options, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// stat('./ch13/ex03/a').then((a) => {
//     console.log(a)
//     return stat('./ch13/ex03/a/b')
// }).then(b => console.log(b));

// mkdir("A")
//     .then(() => mkdir("B"))
//     .then(() => mkdir("C"))
//     .then(() => console.log("COMPLETED"));