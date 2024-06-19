import fsPromises from "node:fs/promises";
import { join } from "path";

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