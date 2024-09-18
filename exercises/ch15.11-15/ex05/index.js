const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
form.addEventListener("submit", (e) => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    e.preventDefault(); // デフォルトでページがリロードされてしまうのでイベント本来の動作を止める

    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (input.value.trim() === "") {
        return;
    }
    const todo = input.value.trim();
    // new-todo の中身は空にする
    input.value = "";
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            // チェックされたら取り消し線を引く
            label.style.textDecorationLine = "line-through";
        } else {
            // チェックが外れたら取り消し線を消す
            label.style.textDecorationLine = "none";
        }
        // toggleが変わった時も判定
        saveToIndexedDB(todo, toggle.checked);
    });
    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
        elem.remove();
        console.log(todo.id);
        deleteFromIndexedDB(todo.id);
    });

    // elem に toggle, label, destroy を追加
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy)
    list.prepend(elem);
    saveToIndexedDB(todo, toggle.checked);
});

// 教材のwithDBが理解しにくかったのでので調べて実装

// indexedDBへの接続を開く
const request = indexedDB.open("todoDB", 1);

// スキーマの更新
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    console.log("create object store111111111");
    //onupgradeneededは、DBのバージョン更新(DBの新規作成も含む)時のみ実行
    if (!db.objectStoreNames.contains("todos")) {
        // autoIncrementでidを自動でインクリメントする
        console.log("create object store");
        db.createObjectStore("todos", {keyPath: "id", autoIncrement: true});
    }
};
/// error 
request.onerror = (event) => {
    console.error("Database error: ", event.target.errorCode);
};
// 完了したときの処理
request.onsuccess = (event) => {
    const db = event.target.result;
    loadFromIndexedDB(db);
};

function saveToIndexedDB(todo, status) {
    const db = request.result;
    const transaction = db.transaction(["todos"], "readwrite");
    const store = transaction.objectStore("todos");
    console.log("||||" + todo);
    // idを付与できなかったのでロードしたら削除できるが　登録した後削除は失敗する　
    store.add({name: todo, status: status});
}

function deleteFromIndexedDB(id) {
    const db = request.result;
    const transaction = db.transaction(["todos"], "readwrite");
    const store = transaction.objectStore("todos");
    store.delete(id);
}

function loadFromIndexedDB(db) {
    const transaction = db.transaction(["todos"], "readonly");
    const store = transaction.objectStore("todos");
    const request = store.getAll();

    request.onsuccess = (event) => {
        const todos = event.target.result;
        console.log(todos);
        todos.forEach((todo) => {
            const elem = document.createElement("li");
            const label = document.createElement("label");
            label.textContent = todo.name;
            const toggle = document.createElement("input");
            toggle.type = "checkbox";
            if (todo.status) {
                label.style.textDecorationLine = "line-through";
                toggle.checked = true;
            } else {
                label.style.textDecorationLine = "none";
            }
            toggle.addEventListener("change", () => {
                if (toggle.checked) {
                    label.style.textDecorationLine = "line-through";
                } else {
                    label.style.textDecorationLine = "none";
                }
            });
            const destroy = document.createElement("button");
            destroy.textContent = "❌";
            destroy.addEventListener("click", () => {
                elem.remove();
                deleteFromIndexedDB(todo.id);
            });
            elem.appendChild(toggle);
            elem.appendChild(label);
            elem.appendChild(destroy);
            list.prepend(elem);
        });
    };
}
