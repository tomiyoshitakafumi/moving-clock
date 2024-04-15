export function any(...args) {
    return function (n) {
        return args.some(arg => arg(n));
    }
}


export function catching(fn, errorFn) {
    return function (input) {
        try {
            return fn(input);
        } catch (e) {
            return errorFn(e);
        }
    }
}