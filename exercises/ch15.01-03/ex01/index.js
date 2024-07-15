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

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
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
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => elem.remove());

    // elem に toggle, label, destroy を追加
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy)
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
});
