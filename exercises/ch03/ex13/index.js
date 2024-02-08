class Example {
    valueOf() {
        return "[object Object]";
    }

    toString() {
        return "[object Object]";
    }
}

let obj = new Example();
console.log(obj.valueOf());
console.log(obj.toString());