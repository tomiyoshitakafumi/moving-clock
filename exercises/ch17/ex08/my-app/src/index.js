// webpack + bableの設定をしなくても create-react-appで


import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
//冪等を保証したいので、React.StrictModeを使う
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  // useStateで状態を管理 set使うことで再レンダリング
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //空の時は登録しない
    if (inputValue.trim() === '') {
      return;
    }
    //新しいtodoを追加
    setTodos([...todos, { text: inputValue.trim(), completed: false }]);
    //送信後はinputを空にする
    setInputValue('');
  };
  //入力値を取得
  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function createTodoElement(todos) {
    // todosの数だけli要素を作成
    return todos.map((todo, index) => (
      <li key={index}>
        <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(index)}/>
        <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</label>
        <button onClick={() => handleDelete(index)}>❌</button>
      </li>
    ));
  }
  function handleToggle(index) {
    // 配列を直接変更すると検知できないので新しく生成
    const newTodos = [...todos];
    //チェックボックス押された物だけ取り消し線フラグを変更
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  function handleDelete(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <html lang="ja">
      <head>
        <title>Simple ToDo</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        <form id="new-todo-form" onSubmit={handleSubmit}>
          {/* valueを入力しないと初期化されない */}
          <input type="text" id="new-todo" placeholder="What needs to be done?" onChange={handleInput} value={inputValue} />
          <button type="submit">Add</button>
        </form>
        {createTodoElement(todos)}
      </body>
    </html>
  );
}