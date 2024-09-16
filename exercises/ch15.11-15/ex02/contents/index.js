const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
console.log("||||||||||||");
document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  // ここではmethod: "GET"を指定しないとダメだった
  const response = await retryWithExponentialBackoff("/api/tasks", {method: "GET", timeout: 3000}, 5);
  // DOMContentLoadedイベントは定期的に発生する?
  if (response) {
    const task = await response.json();
    console.log("||||||||||||||||" + JSON.stringify(task));
    if (response.status === 200) {
      for (const item of task.items) {
        appendToDoItem(item);
      }
    } else {
      alert(`${response.status}: ${task.message}`);
    }
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault(); // デフォルトでページがリロードされてしまうのでイベント本来の動作を止める

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  const response = await retryWithExponentialBackoff("/api/tasks", {
    method: "POST",
    body: JSON.stringify({name: todo}),
    timeout: 3000,
  }, 5);
  if (response) {
    const task = await response.json();

    if (response.status === 201) {
      appendToDoItem(task);
    } else {
      alert(`${response.status}: ${task.message}`);
    }
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.addEventListener("change", async () => {
    console.log(task.status);
    const response = await retryWithExponentialBackoff(`/api/tasks/${task.id}`, {
      method: "PATCH",
      //activeはcompletedに、completedはactiveに変更
      body: JSON.stringify({name: task.name, status: task.status === "active" ? "completed" : "active"}),
      timeout: 3000
    }, 5);
    console.log("add");
    if (response) {
      const task2 = await response.json();
      console.log(JSON.stringify(task2));
      if (response.status === 200) {
        label.style.textDecorationLine = task2.status === "active" ? "none" : "line-through";
        task.status = task2.status;
        console.log(task.status);
      } else {
        alert(`${response.status}: ${response.message}`);
      }
    }
  });
  
  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    const response = await retryWithExponentialBackoff(`/api/tasks/${task.id}`, {
      method: "DELETE",
      timeout: 3000
    }, 5);
    if (response) {
      if (response.status === 204) {
        elem.remove();
      } else {
        const task3 = await response.json();
        alert(`${response.status}: ${task3.message}`);
      }
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

async  function retryWithExponentialBackoff(url,  option = {},maxRetry) {
  let retryCount = 0;

  async function retry() {
    try {
      retryCount++;
      console.log("start");
      const response = await fetchWithTimeout(url, option);
      if (response.ok) {
        return response;
      } 
      if (retryCount <= maxRetry) {
        console.log("retrying" + retryCount);
        await new Promise(resolve => setTimeout(resolve, (2 ** retryCount) * 1000));
        return retry();
      } else {
        alert("リトライ回数を超えました");
        return null;
      }
    } catch (e) {
      alert("タイムアウトしました");
      return null;
    }
  }

  return retry();
}

function fetchWithTimeout(url, options={}) {
  if (options.timeout) {
    let controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => { controller.abort();}, options.timeout);
  }
  return fetch(url, options);
}