const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  //credentialを使うときはワイルドカードは使えない
  //  headers: {"Access-Control-Allow-Origin": "http://localhost"},を使うとエラーになった必要ない?
  const response = await fetch("http://localhost:3001/api/tasks", {
    method: "GET", mode: "cors",
    credentials: "include",
  });
  const task = await response.json();

  if (response.status === 200) {
    for (const item of task.items) {
      appendToDoItem(item);
    }
  } else {
    alert(`${response.status}: ${task.message}`);
  }
});

form.addEventListener("submit", async(e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  const response = await fetch("http://localhost:3001/api/tasks", {
    method: "POST",
    body: JSON.stringify({name: todo}),
    mode: "cors",
    credentials: "include",
  });
  const task = await response.json();

  if (response.status === 201) {
    appendToDoItem(task);
  } else {
    alert(`${response.status}: ${task.message}`);
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
    const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "PATCH",
      //activeはcompletedに、completedはactiveに変更
      body: JSON.stringify({name:task.name, status: task.status === "active" ? "completed" : "active"}),
      headers: {"Access-Control-Allow-Origin": "http://localhost"}, mode: "cors",
      credentials: "include",
    });
    console.log(task.status);
    const task2 = await response.json();
    if (response.status === 200) {
      label.style.textDecorationLine = task2.status === "active" ? "none" : "line-through";
      task.status = task2.status;
      console.log(task.status);
    } else {
      alert(`${response.status}: ${response.message}`);
    }
  });
  
  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    if (response.status === 204) {
      elem.remove();
    } else {
      const task3 = await response.json();
      alert(`${response.status}: ${task3.message}`);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
