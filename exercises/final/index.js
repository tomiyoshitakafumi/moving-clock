

updateTime();
setInterval(updateTime, 1000);

const textElement = document.getElementById('current-time');
let posX = 0;
let posY = 0;
let velocityX = 2;
let velocityY = 2;
let isAnimating = true;
let autoChangeColor = true;
let dataUrl = '';
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

animate();
// Escキーが押されたときに設定画面を表示・非表示にする
// 設定画面中はアニメーションを停止する
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const settings = document.getElementById('settings');
        const header = document.getElementById('settings-header');
        const screenshot = document.getElementById('screenshot-wiew');
        if (settings.style.display === 'none' || settings.style.display === '') {
            settings.style.display = 'block';
            header.style.display = 'block';
            isAnimating = false;
        } else {
            settings.style.display = 'none';
            header.style.display = 'none';
            screenshot.style.display = 'none';
            isAnimating = true;
            animate();
        }
    }

});

document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('settings').style.display = 'none';
    document.getElementById('screenshot-wiew').style.display = 'none';
    document.getElementById('settings-header').style.display = 'none';
    isAnimating = true;
    animate();
});

document.getElementById('auto-change-color').addEventListener('change', (event) => {
    autoChangeColor = event.target.checked;
});

document.getElementById('screenshot').addEventListener('click', () => {
    //スクショ取る前に設定をいったん非表示にする
    document.getElementById('settings').style.display = 'none';
    html2canvas(document.body).then(canvas => {
        dataUrl = canvas.toDataURL('image/png');
        const img = document.getElementById('screenshot-image');
        img.src = dataUrl;
       
        img.style.top = '30px';
        img.style.right = '50%';
        img.style.border = '2px solid white';
        img.style.zIndex = '1000';
        img.style.width = '400px';
        img.style.height = 'auto'; // アスペクト比を維持
        img.style.boxShadow= '0 0 10px rgba(0, 0, 0, 0.5)';
        document.getElementById('settings').style.display = 'block';
        document.getElementById('screenshot-wiew').style.display = 'block';
        document.getElementById('settings-header').style.display = 'none';
        // Twitterウィジェットを再初期化しないとうまく表示されない
        document.getElementById('twttr').setAttribute('class', 'twitter-share-button');
        twttr.widgets.load();
    });
});

document.getElementById('download').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'screenshot.png';
    a.click();
});
//サイズ
document.getElementById('size-slider').addEventListener('input', (event) => {
    const size = event.target.value + 'px';
    const resizableElement = document.getElementById('current-time');
    resizableElement.style.fontSize = size;
});
//スピード
document.getElementById('size-slider-speed').addEventListener('input', (event) => {
    const speed = parseInt(event.target.value, 10);
    velocityX = speed;
    velocityY = speed;
    velocityY = speed;
});
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('current-time').textContent = timeString;
}

function animate() {
    if (!isAnimating) return; 

    const rect = textElement.getBoundingClientRect();
    const parentRect = document.body.getBoundingClientRect();
    if (rect.right > parentRect.right || rect.left < parentRect.left) {
        velocityX = -velocityX;
        if (autoChangeColor) {
            textElement.style.color = getRandomColor();
        }
    }
    if (rect.bottom > parentRect.bottom || rect.top < parentRect.top) {
        velocityY = -velocityY;
        if (autoChangeColor) {
            textElement.style.color = getRandomColor();
        }
    }

    posX += velocityX;
    posY += velocityY;

    textElement.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animate);
}
