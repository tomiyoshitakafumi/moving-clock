export function createMethodLogger(obj) {
    const callHistory = [];

    const handler = {
        get(target, prop, receiver) {
            if (typeof target[prop] === 'function') {
                return function (...args) {
                    callHistory.push({
                        timestamp: new Date(),
                        methodName: prop,
                        parameters: args,
                    });
                    return target[prop].apply(target, args);
                }
            }
            return Reflect.get(target, prop, receiver);
        }
    }

    const proxy = new Proxy(obj, handler);
    return {proxy, callHistory};
}