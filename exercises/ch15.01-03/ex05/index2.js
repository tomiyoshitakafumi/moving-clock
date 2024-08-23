// window.addEventListener("load", () => {
//     document.getElementById("1000").innerHTML = "Hello";
// })
//結果としては上下どちらも似たような速度だったが早かったがDOMContentLoadedイベントの方が早く発火することが多い
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("1000").innerHTML = "Hello";
})
//結論 deferにする　loadは関係ないのでやらない　