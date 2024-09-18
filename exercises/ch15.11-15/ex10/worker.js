self.addEventListener("message", (event) => {
  const { imageData, width, height } = event.data;
  const data = imageData.data;

  // グレースケールへの変換 (RGB を足して平均を取っている)
  //
  // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
  // imageData の中身はそのままに別の配列に結果を格納するとよい
  // ```js
  const outputData = new Uint8ClampedArray(data.length);
  // ガウシアンフィルタは5×5 sigma=1.3とした
  // k = 1/256 * [1  4  6  4 1]
  //             [4 16 24 16 4]
  //             [6 24 36 24 6]
  //             [4 16 24 16 4]
  //             [1  4  6  4 1]
  // 以下畳み込み計算を行う。
  const kernel = [
    [1, 4, 6, 4, 1],
    [4, 16, 24, 16, 4],
    [6, 24, 36, 24, 6],
    [4, 16, 24, 16, 4],
    [1, 4, 6, 4, 1],
  ];

  for(let row = 0; row < height; row++) {
    //iは始まりの画像のピクセルの位置を示す
    let i = row * width * 4;
    // 格納されている。ピクセルごとに4つの連続するバイトで RGBA順に格納される。
    for(let col = 1; col < width-1; col++,i += 4) {
      let r = 0;
      let g = 0;
      let b = 0;
      // 5x5のカーネルを使って畳み込み計算を行う
      for (let kr = 0; kr < 5; kr++) {
        for (let kc = 0; kc < 5; kc++) {
          let k = kernel[kr][kc];
          //カーネルの中心からどのくらいずれているか
          let c = i + (kr - 2) * width * 4 + (kc - 2) * 4;
          r += data[c] * k;
          g += data[c + 1] * k;
          b += data[c + 2] * k;
        }
      }
      outputData[i] = r / 256; // 256で割ることで正規化 赤
      outputData[i + 1] = g / 256;// 緑
      outputData[i + 2] = b / 256;// 青
      outputData[i + 3] = data[i + 3];// 透明度は変化なし
    }
  }
  // ワーカースレッドからメインスレッドに画像データを送信
  self.postMessage({ outputData, width, height });
});