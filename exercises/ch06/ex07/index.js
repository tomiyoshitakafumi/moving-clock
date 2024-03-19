export function assign(target, ...sources) {
    if (target === null || target === undefined) {
        return {};
    }
    for (let source of sources) {
        for (const key in source) {
            target[key] = source[key];
        }
    }
    return target;
}