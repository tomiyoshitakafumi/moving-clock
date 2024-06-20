import fsPromises from "node:fs/promises";
import { join } from "path";

export async function fetchSumOfFileSizes(path, callback) {
    try {
        let files = await fsPromises.readdir(path);

        const rest = [...files];

        if (rest.length === 0) {
            callback(null, 0);
            return;
        }

        let promises = rest.map(next => fsPromises.stat(join(path, next)));
        let state = await Promise.all(promises);
        let total = 0;
        for (let i = 0; i < state.length; i++) {
            total += state[i].size;
        }
        callback(null, total)
        return total;

    } catch (err) {
        callback(err);
    }
}