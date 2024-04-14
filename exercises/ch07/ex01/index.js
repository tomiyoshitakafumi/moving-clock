export function addmatrix(x, y) {

    let result = [[], []];

    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[i].length; j++) {
            result[i][j] = x[i][j] + y[i][j];
        }
    }
    return result;
}

// 乗算じゃなくて減算をやっちゃってる...
export function minusmatrix(x, y) {
    let result = [[], []];
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[i].length; j++) {
            result[i][j] = x[i][j] - y[i][j];
        }
    }
    return result;
}