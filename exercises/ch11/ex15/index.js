export function modifyUrl({base, addQuery, path}) {
    const url = new URL(base);
    if (path) {
        url.pathname = path;
    }

    if (addQuery) {
        for (const [key, value] of addQuery) {
            url.searchParams.set(key, value);
        }
    }

    return url.toString();
}