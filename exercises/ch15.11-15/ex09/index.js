const url = 'ws://localhost:3003'
let socket = new WebSocket(url);
let grid = [];
// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;
const canvas = document.querySelector("#screen");
const ctx = canvas.getContext('2d');
canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

socket.onclose = (event) => {
    console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
};
socket.onerror = (error) => {
    console.log('WebSocket error:', error);
};
// 受け取り時の処理
socket.onmessage = function (event) {
    // console.log(event.data);
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        grid = data.grid;
        renderGrid(grid);
    }
};
// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    // 追加
    socket.send(JSON.stringify({ type: 'toggle', row, col }));
});


// grid を canvas に描画する
function renderGrid(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            ctx.beginPath();
            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}


document.querySelector("#start").onclick = () => {
    socket.send(JSON.stringify({type: 'start'}));
};

document.querySelector("#pause").onclick = () => {
    socket.send(JSON.stringify({type: 'pause'}));
};
