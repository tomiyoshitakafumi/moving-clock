function fizzbuzz(n) {
    let result = Array.from({length: n}, (_, i) => i + 1);
    result.forEach((i) => {
        i % 15 === 0 ? console.log('FizzBuzz') : i % 3 === 0 ? console.log('Fizz') : i % 5 === 0 ? console.log('Buzz') : console.log(i);
    });
}

function sumOfSquaredDifference(f, g) {
    let result = 0;
    f.forEach((_, i) => {
        result += (f[i] - g[i]) ** 2;
    });
    return result;
}

function sumOfEvensIsLargerThan42(array) {
    let sum = 0;
    let result = false;
    array.filter(i => !(i % 2)).forEach((i) => {
        sum += i;
        result = 42 < sum;
    });
    return result;
}

/**
 * fizzbuzzの文字列をコンソール出力します。
 * @param {number} n 自然数
 */
function fizzbuzz(n) {
    const nArry = new Array(n).fill(0).map((_, index) => {
        return index + 1;
    });
    const fizzArry = nArry.filter((value) => value % 3 === 0);
    const buzzArry = nArry.filter((value) => value % 5 === 0);
    const fizzbuzzArry = nArry.filter((value) => value % 15 === 0);
    buzzArry.forEach((value) => {
        nArry[value - 1] = "Buzz"
    });
    fizzArry.forEach((value) => {
        nArry[value - 1] = "Fizz";
    });
    fizzbuzzArry.forEach((value) => {
        // valueから1引いた値がindex
        nArry[value - 1] = "FizzBuzz";
    });
    nArry.forEach((value) => {
        console.log(value);
    })
}
 