updateTime();
setInterval(updateTime, 1000);

// ページを開いた時間を記録
const startTime = new Date();
// 1秒ごとに経過時間を更新
let elapsedTimeInterval = setInterval(updateElapsedTime, 1000);


const textElement = document.getElementById('current-time');
let posX = 0;
let posY = 0;
let velocityX = 2;
let velocityY = 2;
let isAnimating = true;
let autoChangeColor = true;
let dataUrl = '';
let speed = 2;
let nowhours = 0;
let nowminutes = 0;
let nowseconds = 0;
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
        toggleSettings();
    }

});
document.getElementById('gear').addEventListener('click', () => {
    toggleSettings();
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
    document.getElementById('gear').style.display = 'none';
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
        img.style.boxShadow= '0 0 10px rgba(0, 0, 0, 0.2)';
        document.getElementById('settings').style.display = 'block';
        document.getElementById('screenshot-wiew').style.display = 'block';
        document.getElementById('settings-header').style.display = 'none';
        document.getElementById('gear').style.display = 'block';
        // Twitterウィジェットを再初期化しないとうまく表示されない
        document.getElementById('twttr').setAttribute('class', 'twitter-share-button');
        let text = `あなたは動く時計を${nowhours}時間${nowminutes}分${nowseconds}秒見ていました！`;
        const tweetUrl = `https://twitter.com/share?url=https://tomiyoshitakafumi.github.io/moving-clock/%0A&text=${text}&hashtags=動く時計`;
        document.getElementById('twttr').setAttribute('href', tweetUrl);
        document.getElementById('twttr').setAttribute('img src', tweetUrl);
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
    speed = parseInt(event.target.value, 10);
    velocityX = speed;
    velocityY = speed;
    velocityY = speed;
});
function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit' };
    let timeString = now.toLocaleTimeString('ja-JP', options);

    if (document.getElementById('view-second').checked) {
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeString += `<span class="small-seconds">${seconds}</span>`;
    }

    document.getElementById('current-time').innerHTML = timeString;
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
    // 画面外に出たときに初期位置に戻す(ex:サイズを大きくした時)
    if (parentRect.right - rect.right < -speed || rect.left < -speed || rect.top < -speed || parentRect.bottom - rect.bottom < -speed) {
        posX=0;
        posY=0;
    }

    posX += velocityX;
    posY += velocityY;

    // 残像を作成
    if (document.getElementById('view-afterimage').checked) {
        const clone = textElement.cloneNode(true);
        clone.style.position = 'absolute';
        const computedStyle = getComputedStyle(textElement);
        const fontSize = parseInt(computedStyle.fontSize);
        clone.style.transform = `translate(${posX}px, ${posY - fontSize/2}px)`;
        clone.style.opacity = '0.2'; // 残像の透明度を設定
        document.body.appendChild(clone);
        // 一定時間後に残像を削除
        setTimeout(() => {
            clone.remove();
        }, 150); 
    }
    textElement.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animate);
}


function updateElapsedTime() {
    const now = new Date();
    const elapsedTime = Math.floor((now - startTime) / 1000); // 経過時間を秒で計算
    nowhours = Math.floor(elapsedTime / 3600);
    nowminutes = Math.floor((elapsedTime % 3600) / 60);
    nowseconds = elapsedTime % 60;
    document.getElementById('elapsed-time').innerText = `あなたは${nowhours}時間${nowminutes}分${nowseconds}秒この画面を見ていました！`;
}

function toggleSettings() {
    const settings = document.getElementById('settings');
    const header = document.getElementById('settings-header');
    const screenshot = document.getElementById('screenshot-wiew');
    if (settings.style.display === 'none' || settings.style.display === '') {
        settings.style.display = 'block';
        header.style.display = 'block';
        isAnimating = false;
        clearInterval(elapsedTimeInterval); // 経過時間の更新を停止
    } else {
        settings.style.display = 'none';
        header.style.display = 'none';
        screenshot.style.display = 'none';
        isAnimating = true;
        elapsedTimeInterval = setInterval(updateElapsedTime, 1000); // 経過時間の更新を再開
        animate();
    }
}