/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex09/dist/task.js":
/*!***************************!*\
  !*** ./ex09/dist/task.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskManager: () => (/* binding */ TaskManager),
/* harmony export */   isLowOrCompletedTask: () => (/* binding */ isLowOrCompletedTask),
/* harmony export */   not: () => (/* binding */ not)
/* harmony export */ });
// 以下の型を定義すること
//  - User: { id: number, name: string }
//  - Task: { title: string, completed: boolean, user: User }
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型

//check
//       
                
             
               
 

                
                
                     
             
 

                                          

                                                         


// Userオブジェクトであることを判定する
function isUserObject(obj     )          {
  return (
    typeof obj === "object" &&
    typeof obj["id"] === "number" &&
    typeof obj["name"] === "string"
  );
}

class TaskManager          {
  _tasks      = [];

  // タスクを追加する
  add(task   ) {
    this._tasks.push(task);
  }

  // タスクを完了にする
  // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
  // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
  completeTask(target               ) {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  // 引数を省略した場合はすべてのタスクを返す
  getTasks(predicate                       )      {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
function isLowOrCompletedTask(priorityTask              )          {
  return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
function not(f                                )                                 {
  return (arg) => !f(arg);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./ex09/dist/caller.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./ex09/dist/task.js");


const user1 = { id: 1, name: "Alice" };
const user2 = { id: 2, name: "Bob" };

const taskManager = new _task_js__WEBPACK_IMPORTED_MODULE_0__.TaskManager();

taskManager.add({
  title: "テキストを読む",
  completed: false,
  user: user1,
  priority: "high",
});

taskManager.add({
  title: "質問表を書く",
  completed: false,
  user: user1,
  priority: "middle",
});

taskManager.add({
  title: "質問表を確認する",
  completed: false,
  user: user2,
  priority: "low",
});

taskManager.add({
  title: "問題を作成する",
  completed: false,
  user: user2,
  priority: "middle",
});

taskManager.completeTask(user1);
taskManager.completeTask("質問表を確認する");

console.log(taskManager.getTasks());
console.log(taskManager.getTasks((0,_task_js__WEBPACK_IMPORTED_MODULE_0__.not)(_task_js__WEBPACK_IMPORTED_MODULE_0__.isLowOrCompletedTask)));

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map