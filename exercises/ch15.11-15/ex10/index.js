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

    const worker = new Worker("worker.js");
    // メインスレッドからワーカースレッドに画像データを送信
    worker.postMessage({ imageData, width: img.width, height: img.height });

    worker.addEventListener("message", (e) => {
      console.log(e.data);
      const { outputData, width, height } = e.data;
      const outputImageData = new ImageData(outputData, width, height);
      filteredCtx.putImageData(outputImageData, 0, 0);
    });
  });

  reader.readAsDataURL(file);
});