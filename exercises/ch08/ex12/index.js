export function f(str) {
    return function (...args) {
        const fn = new Function(
            ...Object.keys(args),
            `return ${str.replace(/\$(\d+)/g, (_, i) => `arguments[${i}]`)}`
        );
        return fn(...args);
    };
}
return (...args) => {
    for (let i = 0; i < args.length; i++) {
        str = str.replace(new RegExp(`\\$${i + 1}`), `"${args[i]}"`);
    }
    return eval(str);
}