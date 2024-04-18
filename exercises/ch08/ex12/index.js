// 最後のテストが通っていません。
export function f(str) {
    return new Function(
        "...arguments",
        `return ${str.replace(/\$(\d+)/g, (_, i) => `arguments[${i - 1}]`)}`
        );
}

// return (...args) => {
//     for (let i = 0; i < args.length; i++) {
//         str = str.replace(new RegExp(`\\$${i + 1}`), `"${args[i]}"`);
//     }
//     return eval(str);
// }