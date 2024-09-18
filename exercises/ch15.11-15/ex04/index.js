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
    });
    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => elem.remove());

    // elem に toggle, label, destroy を追加
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy)
    list.prepend(elem);
    saveToLocalStorage();
});

// ページ読み込み時に ToDo リストを読み込む
window.addEventListener("load", loadFromLocalStorage);

function saveToLocalStorage() {
    const todos = [];
    //本当はひとつづつstorageに保存したかったが毎度上書きされてしまうので要素から値を取得して保存している
    list.querySelectorAll("li").forEach((item) => {
        const label = item.querySelector("label");
        const toggle = item.querySelector("input[type='checkbox']");
        todos.push({name: label.textContent, status: toggle.checked});
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
}

function loadFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => {
        // 共通化できそう
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
                // チェックされたら取り消し線を引く
                label.style.textDecorationLine = "line-through";
            } else {
                // チェックが外れたら取り消し線を消す
                label.style.textDecorationLine = "none";
            }
        });
        const destroy = document.createElement("button");
        destroy.textContent = "❌";
        destroy.addEventListener("click", () => elem.remove());
        elem.appendChild(toggle);
        elem.appendChild(label);
        elem.appendChild(destroy)
        list.prepend(elem);
    });
    console.log(todos);
}