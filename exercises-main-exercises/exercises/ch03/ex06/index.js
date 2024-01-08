export function substring(str, indexStart, indexEnd) {

    let result = "";
    // idnexStartとindexEndがマイナスの場合は0にする
    if (indexStart < 0 || Number.isNaN(indexStart)) {
        indexStart = 0;
    }
    if (indexEnd < 0 || Number.isNaN(indexEnd)) {
        indexEnd = 0;
    }

    // 引数が2つの場合
    if (indexEnd === undefined) {
        // 小数点切り捨て
        indexStart = Math.floor(indexStart);

        // idnexStartがマイナスの時は全て表示
        if (indexStart < 0) {
            return str;
        }

        for (let i = indexStart; i < str.length; i++) {
            result += str[i];
        }
        return result;
    }
    
    // 小数点切り捨て
    indexStart = Math.floor(indexStart);
    indexEnd = Math.floor(indexEnd);

    if (indexStart === indexEnd) {
        return "";
    }
// indexStartがindexEndより大きい場合はindexStartとindexEndが交換されたとみなす
    if (indexStart > indexEnd) {
        [indexStart, indexEnd] = [indexEnd, indexStart];
    }

    for (let i = indexStart; i < indexEnd && i < str.length; i++) {
        result += str[i];
    }
    return result;

}

export function slice(str, indexStart, indexEnd) {
    // let result = "";
    // for (let i = indexStart; i < indexEnd; i++) {
    //     result += str[indexStart];
    // }
    // return result;
}

export function padStart(str, targetLength, padString) {

    // if (str.length >= targetLength) {
    //     return str;
    // }
    // while (str.length === targetLength) {
    //     // 足した時に文字数がオーバーした場合　オーバーした分padStringの末尾を結合しない
    //     if (str.length + padString.length > targetLength) {
    //         let diffLength = str.length + padString.length - targetLength;
    //         while (diffLength--) {
    //             str = padString[diffLength] + str;
    //         }
    //         return str;
    //     } else {
    //         str = padString + str;
    //     }
    // }
    // return str;
}

export function trim(str) {
    return "TODO";
}

// console.log(substring("a3r3r", 2));