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