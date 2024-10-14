import fs from 'fs';
function checkEntry(path) {
    try {
        let stats = fs.statSync(path);
        if (stats.isFile()) {
            return 'file';
        } else if (stats.isDirectory()) {
            return 'directory';
        } else {
            return 'unknown';
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            return 'not found';
        }
        throw error;
    }
}
export { checkEntry };