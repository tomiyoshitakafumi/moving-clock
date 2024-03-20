export function sum(arr = []) {
    return arr.reduce((a, b) => a + b, 0);
}

export function join(arr, separator = ",") {
//微妙なところ
    if (arr.length === 0) {
        return "";
    }
    return arr.map(x => x === null ? "" : x).reduce((a, b) => `${a}${separator}${b}`);
}

export function reverse(arr) {
    return arr.reduce((a, b) => [b, ...a], []);
}

export function every(arr, callback) {
    return arr.reduce((a, b, i, _arr) => (a && callback(b, i, _arr)) ? b : false, true);
}

export function some(arr, callback) {
    return arr.reduce((a, b, i, _arr) => (a || callback(b, i, _arr)), false);
}