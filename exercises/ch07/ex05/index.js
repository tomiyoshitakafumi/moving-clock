export function pop(arr) {
    //微妙かも
    let arr1 = [...arr];
    return arr1.slice(0, arr1.length - 1);
}

export function push(arr, num) {
    return arr.concat(num);
}

export function shift(arr) {
    //微妙かも
    let arr1 = [...arr];
    return arr1.slice(1, arr1.length)
}

export function unshift(arr, num) {
    return [num].concat(arr);
}

export function sort(arr, callBack) {
    let arr1 = [...arr];
    // array.reverse()
    //バブルソート
    for (let j = 0; j < arr.length - 1; j++) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (callBack(arr1[i], arr1[i + 1]) > 0) {
                [arr1[i], arr1[i + 1]] = [arr1[i + 1], arr1[i]];
            }
        }
    }
    return arr1;
}
