export function isChekingValue(x, y) {
    // 差が10^(-10)未満だったら誤差として一致とみなす
    if (Math.abs(x - y) < 1e-10) {
        return true;
    } else {
        return false;
    }
}