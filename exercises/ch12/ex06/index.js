import fs from 'fs';
import path from 'path';

export function* walk(rootPath) {
    let stat = fs.statSync(rootPath);

    if (stat.isDirectory()) {
        yield {path: path.join(rootPath, ''), isDirectory: true};

        const files = fs.readdirSync(rootPath);
        for (let file of files) {
            //現在のpathをrootPathとfileで結合して再帰的に処理する
            yield* walk(path.join(rootPath, file));
        }
    } else {
        yield {path: rootPath, isDirectory: false};
    }
}

//
// let a = walk('./test');
// console.log(a.next().value);
// console.log(a.next().value);
// console.log(a.next().value);
// console.log(a.next().value);