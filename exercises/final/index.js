
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('current-time').textContent = timeString;
}

window.onload = function() {
    updateTime();
    setInterval(updateTime, 1000);

    const textElement = document.getElementById('current-time');
    let posX = 0;
    let posY = 0;
    let velocityX = 2;
    let velocityY = 2;

    function animate() {
        const rect = textElement.getBoundingClientRect();
        const parentRect = document.body.getBoundingClientRect();
        if (rect.right > parentRect.right || rect.left < parentRect.left) {
            velocityX = -velocityX;
            textElement.style.color = getRandomColor();
        }
        if (rect.bottom > parentRect.bottom || rect.top < parentRect.top) {
            velocityY = -velocityY;
            textElement.style.color = getRandomColor();
        }

        posX += velocityX;
        posY += velocityY;

        textElement.style.transform = `translate(${posX}px, ${posY}px)`;
        requestAnimationFrame(animate);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    animate();
};