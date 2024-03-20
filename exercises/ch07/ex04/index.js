const data = [
    {name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20},
    {name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60},
    {name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30},
    {name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60},
    {name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40},
    {name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80},
    {name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50},
    {name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30},
    {name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90},
];

let mathSum = data.reduce((sum, student) => sum + student.math, 0);
console.log("1:" + mathSum);

let classA = data.filter(d => d.class === "A");
let ava = classA.reduce((sum, student) => sum + student.math, 0) / classA.length;
console.log("2:" + ava);

let classC = data.filter(d => d.class === "C");
let ave = classC.reduce((sum, student) => sum + student.math + student.chemistry + student.geography, 0) / (classC.length * 3);
console.log("3:" + ave);

let maxName = {name: "", sum: 0};
data.forEach(student => {
    let sum = student.math + student.chemistry + student.geography;
    if (sum > maxName.sum) {
        maxName = {name: student.name, sum: sum};
    }
});
console.log("4:" + maxName.name);

let aveGeography = data.reduce((sum, student) => sum + student.geography, 0) / data.length;
let square = 0;
data.forEach(student => {
    square += Math.pow(student.geography - aveGeography, 2)
});
let sd = Math.sqrt(square / data.length);
console.log("5:" + sd);