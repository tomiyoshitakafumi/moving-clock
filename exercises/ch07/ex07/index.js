//ボゴソート

function isSort(array, callBack) {
    for (let i = 0; i < array.length - 1; i++) {
        if (callBack(array[i], array[i + 1]) > 0) {
            return false;
        }
    }
    return true;
}

export function sort(array, callBack) {
    while (!isSort(array, callBack)) {
        //Fisher–Yatesアルゴリズムでランダムに配列をシャッフル
        for (let i = 0; i < array.length; i++) {
            const j = Math.floor(Math.random() * array.length);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
}