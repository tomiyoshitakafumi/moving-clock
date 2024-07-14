export function unwritableAndUnconfigurableObj() {
    let o = {a: 1};
    Object.freeze(o);
    return o;
}

export function writableAndUnconfigurableObj() {
    let o = {};
    Object.defineProperty(o, "b", {
        value: 2,
        enumerable: true,
        configurable: false,
        writable: true
    });
    return o;
}

export function nestedUnwritableObj() {
    let o = {c: {d: {e: 3}}};
    return deepFreeze(o);

}

//深い凍結
function deepFreeze(obj) {
    Object.freeze(obj);
    for (const name of Object.getOwnPropertyNames(obj)) {
        deepFreeze(obj[name]);
    }
    return obj;
}