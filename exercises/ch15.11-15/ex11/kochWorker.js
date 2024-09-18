self.addEventListener("message",(event) => {
    const { x1, y1, x2, y2, depth } = event.data;
    const lines = [];
    drawKochSnowflake(x1, y1, x2, y2, depth, lines);
    self.postMessage(lines);
});

function drawKochSnowflake(x1, y1, x2, y2, depth, lines) {
    if (depth === 0) {
        lines.push({ x1, y1, x2, y2 });
    } else {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const x3 = x1 + dx / 3;
        const y3 = y1 + dy / 3;
        const x5 = x1 + 2 * dx / 3;
        const y5 = y1 + 2 * dy / 3;
        const x4 = (x1 + x2) / 2 + Math.sqrt(3) * (y1 - y2) / 6;
        const y4 = (y1 + y2) / 2 + Math.sqrt(3) * (x2 - x1) / 6;

        drawKochSnowflake(x1, y1, x3, y3, depth - 1, lines);
        drawKochSnowflake(x3, y3, x4, y4, depth - 1, lines);
        drawKochSnowflake(x4, y4, x5, y5, depth - 1, lines);
        drawKochSnowflake(x5, y5, x2, y2, depth - 1, lines);
    }
}