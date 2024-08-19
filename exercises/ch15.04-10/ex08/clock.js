(function updateClock() { // SVG時計の画像を更新して現在時刻を表示する。
    let now = new Date(); // 現在時刻。
    let sec = now.getSeconds(); // 秒。
    let min = now.getMinutes() + sec/60; // 小数部を持つ分。
    let hour = (now.getHours() % 12) + min/60; // 小数部を持つ時。
    let secangle = sec * 6; // 1秒あたり6度。
    let minangle = min * 6; // 1分あたり6度。
    let hourangle = hour * 30; // 1時間あたり30度。
    
    //秒針追加
    let sechand = document.querySelector("#clock .sechand");
    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");
    // 秒針追加
    sechand.setAttribute("transform", `rotate(${secangle},50,50)`);
    minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
    setTimeout(updateClock, 1000);
}()); 