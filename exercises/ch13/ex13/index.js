import path from 'path';
import fsPromises from "node:fs/promises";

export async function* walk(rootPath) {
    let stat = await fsPromises.stat(rootPath);

    if (stat.isDirectory()) {
        yield {path: path.join(rootPath, ''), isDirectory: true};

        const files = await fsPromises.readdir(rootPath);
        for (let file of files) {
            //現在のpathをrootPathとfileで結合して再帰的に処理する
            yield* walk(path.join(rootPath, file));
        }
    } else {
        yield {path: rootPath, isDirectory: false};
    }
}