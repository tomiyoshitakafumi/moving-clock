import * as fsPromises from "node:fs/promises";
import { join } from "path";

export async function fetchFirstFileSize(path, callback) {
    try {
        let files = await fsPromises.readdir(path)
        if (files.length === 0) {
            callback(null, null);
            return;
        }
        let stats = await fsPromises.stat(join(path, files[0]))
        return callback(null, stats.size);
    } catch (err) {
        callback(err);
    }
}

export async function fetchSumOfFileSizes(path, callback) {
    try {
        let files = await fsPromises.readdir(path);

        let total = 0;
        const rest = [...files];

        async function iter() {
            if (rest.length === 0) {
                callback(null, total);
                return;
            }

            const next = rest.pop();
            let stats = await fsPromises.stat(join(path, next));
            total += stats.size;
            return iter();
        }

        return iter();
    } catch (err) {
        callback(err);
    }
}