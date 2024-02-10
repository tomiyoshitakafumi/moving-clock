export function bitCount(n) {
    let count = 0;
    while (n !== 0) {
        let bit = n & 0x0001;
        if (bit) {
            count++;
        }
        n >>= 1;
    }
    return count;
}