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
let totalElapsedTime = 0;
let lastAfterimageTime = 0;
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ローカルストレージから以前の経過時間を取得して合算する
const storedElapsedTime = localStorage.getItem('elapsedTime');
if (storedElapsedTime) {
    totalElapsedTime = parseInt(storedElapsedTime, 10);
}
animate();
// 画面がクリックされたときに設定画面を表示する
document.addEventListener('click', () => {
    if (new Date - startTime > 1000) {
        toggleSettings();
    }
});

// settingsがクリックされたときに設定画面を表示しない
document.getElementById('settings').addEventListener('click', (event) => {
    event.stopPropagation();
});

document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('settings').style.display = 'none';
    document.getElementById('screenshot-wiew').style.display = 'none';
    document.getElementById('settings-header').style.display = 'none';
    elapsedTimeInterval = setInterval(updateElapsedTime, 1000); // 経過時間の更新を再開
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

        img.style.top = '30%';
        img.style.right = '50%';
        img.style.border = '2px solid white';
        img.style.zIndex = '1000';
        img.style.width = '100%';
        img.style.height = 'auto'; // アスペクト比を維持
        img.style.boxShadow= '0 0 10px rgba(0, 0, 0, 0.5)';
        document.getElementById('settings').style.display = 'block';
        document.getElementById('screenshot-wiew').style.display = 'block';
        document.getElementById('settings-header').style.display = 'none';
        document.getElementById('gear').style.display = 'block';
        // Twitterウィジェットを再初期化しないとうまく表示されない
        document.getElementById('twttr').setAttribute('class', 'twitter-share-button');
        let text = `あなたは動く時計を${nowhours}時間${nowminutes}分${nowseconds}秒見ていました！`;
        const tweetUrl = `https://twitter.com/share?url=https://tomiyoshitakafumi.github.io/moveing-clock/%0A&text=${text}&hashtags=動く時計`;
        document.getElementById('twttr').setAttribute('href', tweetUrl);
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
    speed = parseInt(event.target.value, 10)/10;
    velocityX = speed;
    velocityY = speed;
    velocityY = speed;
});

//秒だけ別で表示
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
        posX = 0;
        posY = 0;
    }

    posX += velocityX;
    posY += velocityY;

    // 残像を作成
    if (document.getElementById('view-afterimage').checked) {
        const now = Date.now();
        if (now - lastAfterimageTime >= 10) { // 0.01秒に一回
            const clone = textElement.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.transform = `translate(${posX}px, ${posY}px)`;
            clone.style.opacity = '0.2'; // 残像の透明度を設定
            textElement.insertAdjacentElement('afterend', clone);
            // 一定時間後に残像を削除
            setTimeout(() => {
                clone.remove();
            }, 150);
            lastAfterimageTime = now;
        }
    }
    textElement.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animate);
}

function updateElapsedTime() {
    const now = new Date();
    const elapsedTime = Math.floor((now - startTime) / 1000); // 経過時間を秒で計算
    const combinedElapsedTime = totalElapsedTime + elapsedTime; // 合算した経過時間
    nowhours = Math.floor(combinedElapsedTime / 3600);
    nowminutes = Math.floor((combinedElapsedTime % 3600) / 60);
    nowseconds = combinedElapsedTime % 60;
    document.getElementById('elapsed-time').innerText = `あなたは動く時計を${nowhours}時間${nowminutes}分${nowseconds}秒見ていました！`;
    document.getElementById('elapsed-time').style.fontSize = '15px';
    // ローカルストレージに合算した経過時間を保存
    localStorage.setItem('elapsedTime', combinedElapsedTime);
}

function toggleSettings() {
    const settings = document.getElementById('settings');
    const header = document.getElementById('settings-header');
    const screenshot = document.getElementById('screenshot-wiew');
    if (settings.style.display === 'none' || settings.style.display === '') {
        settings.style.display = 'block';
        header.style.display = 'block';
   
        clearInterval(elapsedTimeInterval); // 経過時間の更新を停止
    } else {
        settings.style.display = 'none';
        header.style.display = 'none';
        screenshot.style.display = 'none';
     
        elapsedTimeInterval = setInterval(updateElapsedTime, 1000); // 経過時間の更新を再開
       
    }
}

document.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
});
