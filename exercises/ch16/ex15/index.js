import threads from "worker_threads";
import { fileURLToPath } from 'url';

//__filenameはESMでは使えないので、fileURLToPathを使って__filenameを取得する。
const __filename = fileURLToPath(import.meta.url);

// sample
// if (threads.isMainThread) {
//     let sharedBuffer = new SharedArrayBuffer(4);
//     let sharedArray = new Int32Array(sharedBuffer);
//     let worker = new threads.Worker(__filename, { workerData: sharedArray });
//     worker.on("online", () => {
//         for (let i = 0; i < 10_000_000; i++) {
//             Atomics.add(sharedArray, 0, 1); // スレッドセーフでアトミックなインクリメント。
//         }
//         worker.on("message", (message) => {
//             // 両方のスレッドが終了したら、スレッドセーフな関数を使って
//             // 共有配列を読み込み、期待通りの20,000,000という値になって
//             // いることを確認する。
//             console.log(Atomics.load(sharedArray, 0));
//         });
//     });
// } else {
//     let sharedArray = threads.workerData;
//     for (let i = 0; i < 10_000_000; i++) {
//         Atomics.add(sharedArray, 0, 1); // スレッドセーフでアトミックなインクリメント。
//     }
//     threads.parentPort.postMessage("done");
// }



if (threads.isMainThread) {
    let num = 0;//sharedArray[0];
    const worker = new threads.Worker(__filename);

    worker.on("message", (message) => {
        if (message === "increment") {
            num++;
        } else if (message === "done") {
            console.log(num);
        }
    });

    worker.on("online", () => {
        for (let i = 0; i < 10_000_000; i++) {
            num++; 
        }
        worker.postMessage("start");
    });
} else {
    threads.parentPort.on("message", (message) => {
        if (message === "start") {
            for (let i = 0; i < 10_000_000; i++) {
                threads.parentPort.postMessage("increment"); // メインスレッドにインクリメントを依頼
            }
            threads.parentPort.postMessage("done");
        }
    });
}