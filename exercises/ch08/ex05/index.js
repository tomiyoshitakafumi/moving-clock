export function sequenceToObject(...value) {
    if (value.length % 2 !== 0) {
        throw new Error('Invalid arguments')
    }
    // 問題文の奇数の番は1から　indexは0から
    if (value.some((v, i) => i % 2 === 0 && typeof v !== 'string')) {
        throw new Error('Invalid arguments')
    }

    let obj = {};
    for (let i = 0; i < value.length; i += 2) {
        obj[value[i]] = value[i + 1];
    }
    return obj;
}