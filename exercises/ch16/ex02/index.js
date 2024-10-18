import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

//シグナル2つを受け取る
//SIGINT: Ctrl+C
process.on("SIGINT", handleSignal);
// echo $$でプロセスIDを取得してkill -3 プロセスIDでSIGTERMを送信しようとしたがうまくキルができなかった
process.on("SIGTERM", handleSignal);

startAndMonitorChild().catch((err) => {
  console.error("Error function:", err);
  process.exit(1);
});

async function startAndMonitorChild(){
  let [exitCode, exitSignal] = await startChild();
  //exitCodeが1の場合は異常終了それ以外の場合は再起動
  console.log(exitCode, exitSignal);
  if (exitCode === 1) {
    console.log("Child process exited abnormally, restarting...");
    await startAndMonitorChild();
  }
};

function handleSignal(signal){
  console.log(`Received signal ${signal}, forwarding to child process...`);
  if (child) {
    child.kill(signal);
  }
  // 0は正常終了
  process.exit(0);
};
