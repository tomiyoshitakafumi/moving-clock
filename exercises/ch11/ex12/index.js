class FileSizeError extends Error {
    constructor(status, filePath) {
        super(`${status} File at ${filePath} exceeds maximum size`);
        this.filePath = filePath;
    }

    get name() {
        return "FileSizeError";
    }
}

// 413 Payload Too Large
let error = new HTTPError(413, "path/hoge");
error.status
error.message
error.name
error.filePath