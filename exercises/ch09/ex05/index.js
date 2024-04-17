export function instanceOf(object, constructor) {
    let proto = Object.getPrototypeOf(object);
    while (proto) {
        if (proto === constructor.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

// export function instanceOf(object, constructor) {
//     return object
//         instanceof
//         constructor;
// }