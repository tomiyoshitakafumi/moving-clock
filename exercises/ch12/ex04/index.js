export function* getPrimeNumber() {
    let primes = [];
    for (let i = 2; ; i++) {
        // 素数を配列に格納してそれで割れるかをチェックしているので
        // エラトステネスの篩とちょっと違うかもしれない(決まった数までの素数を列挙するのがエラトステネスの篩?)
        if (primes.every(prime => i % prime !== 0)) {
            primes.push(i);
            yield i;
        }
    }
}