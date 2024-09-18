const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';

const worker = new Worker('kochWorker.js');

worker.addEventListener("message", (event) => {
    const lines = event.data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (const line of lines) {
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
    }
    ctx.stroke();
});

const depth = 9; // 再帰の深さ
const size = 500;
const height = size * Math.sqrt(3) / 2;a
const angle = Math.PI / 3; 

// 座標を回転させる関数
function rotate(x, y, angle) {
    return {
        x: x * Math.cos(angle) - y * Math.sin(angle),
        y: x * Math.sin(angle) + y * Math.cos(angle)
    };
}

const centerX = canvas.width / 2;
const centerY = canvas.height / 2+ 150;

const p1 = rotate(-size / 2, height / 3, angle);
const p2 = rotate(size / 2, height / 3, angle);
const p3 = rotate(0, -2 * height / 3, angle);

const x1 = centerX + p1.x;
const y1 = centerY + p1.y;
const x2 = centerX + p2.x;
const y2 = centerY + p2.y;
const x3 = centerX + p3.x;
const y3 = centerY + p3.y;

worker.postMessage({ x1, y1, x2, y2, depth });
worker.postMessage({ x1: x2, y1: y2, x2: x3, y2: y3, depth });
worker.postMessage({ x1: x3, y1: y3, x2: x1, y2: y1, depth });