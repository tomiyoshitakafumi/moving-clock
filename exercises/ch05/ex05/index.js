export function deleteodd(obj) {
    for (let p in obj) {
        // obj[p] % 2 !== 0
        if (obj[p] % 2 ^ 0) {
            delete obj[p];
        }
    }
    return obj;
}
