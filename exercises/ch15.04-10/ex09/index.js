document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // TODO: ここで imageData.data を参照して outputData に結果を格納
    //
    // ガウシアンフィルタは5×5 sigma=1.3とした
    // k = 1/256 * [1  4  6  4 1]
    //             [4 16 24 16 4]
    //             [6 24 36 24 6]
    //             [4 16 24 16 4]
    //             [1  4  6  4 1]
    // 以下畳み込み計算を行う。
    
    const kernel = [[1, 4, 6, 4, 1], [4,16,24,16,4],[6,24,36,24,6],[4,16,24,16,4],[1,4 ,6 ,4,1]];
    
    for(let row = 0; row < img.height; row++) {
      //iは始まりの画像のピクセルの位置を示す
      let i = row * img.width * 4;
      // 格納されている。ピクセルごとに4つの連続するバイトで RGBA順に格納される。
      for(let col = 1; col < img.width-1; col++,i += 4) {
        let r = 0;
        let g = 0;
        let b = 0;
        // 5x5のカーネルを使って畳み込み計算を行う
        for (let kr = 0; kr < 5; kr++) {
          for (let kc = 0; kc < 5; kc++) {
            let k = kernel[kr][kc];
            //カーネルの中心からどのくらいずれているか
            let c = i + (kr - 2) * img.width * 4 + (kc - 2) * 4;
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
    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
    // ```
    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }
    //
    // filteredCtx.putImageData(imageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
