export function add(a, b) {
    return {realNum: a.realNum + b.realNum, imaginaryNum: a.imaginaryNum + b.imaginaryNum}
}
export function sub(a, b) {
    return {realNum: a.realNum - b.realNum, imaginaryNum: a.imaginaryNum - b.imaginaryNum}
}

export function mul(a, b) {
    return {
        realNum: a.realNum * b.realNum - a.imaginaryNum * b.imaginaryNum,
        imaginaryNum: a.realNum * b.imaginaryNum + b.realNum * a.imaginaryNum
    }
}

export function div(a, b) {
    const denominator = b.realNum ^ 2 + b.imaginaryNum ^ 2;
    if (denominator === 0) return throw new Error("エラー");
    return {
        realNum: (a.realNum * b.realNum + a.imaginaryNum * b.imaginaryNum) / denominator,
        imaginaryNum: (a.imaginaryNum * b.realNum - a.realNum * b.imaginaryNum) / denominator,
    }
}
