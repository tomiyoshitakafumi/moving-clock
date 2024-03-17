export function getAllProperty(obj) {
    let a = Object.getOwnPropertyNames(obj);
    let b = Object.getOwnPropertySymbols(obj);
    let c = [];
    while (Object.getPrototypeOf(obj) !== null) {
        c = [...c, ...Object.keys(obj)];
        obj = Object.getPrototypeOf(obj);
    }

    return [...new Set([...a, ...b, ...c])];
}