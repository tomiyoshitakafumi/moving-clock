/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/index.js":
/*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _indexUpdateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexUpdateGrid.js */ \"./ex05/indexUpdateGrid.js\");\n/* harmony import */ var _indexRenderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexRenderGrid.js */ \"./ex05/indexRenderGrid.js\");\n\r\n\r\n\r\n\r\n// 50 x 50 の盤面とする\r\nconst ROWS = 50;\r\nconst COLS = 50;\r\n// 1セルのサイズ\r\nconst RESOLUTION = 10;\r\n\r\nconst canvas = document.querySelector(\"#screen\");\r\nconst ctx = canvas.getContext(\"2d\");\r\nconst startButton = document.querySelector(\"#start\");\r\nconst pauseButton = document.querySelector(\"#pause\");\r\n\r\ncanvas.width = ROWS * RESOLUTION;\r\ncanvas.height = COLS * RESOLUTION;\r\n\r\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID\r\nlet animationId = null;\r\n\r\n// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3\r\nconst sound = new Audio(\"/ch15.04-10/ex10/decision1.mp3\");\r\n\r\n// ライフゲームのセル (true or false) をランダムに初期化する\r\nlet grid = new Array(ROWS)\r\n  .fill(null)\r\n  .map(() =>\r\n    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))\r\n  );\r\n\r\n// canvas がクリックされたときの処理 (セルの値を反転する)\r\ncanvas.addEventListener(\"click\", function (evt) {\r\n  const rect = canvas.getBoundingClientRect();\r\n  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };\r\n\r\n  const row = Math.floor(pos.y / RESOLUTION);\r\n  const col = Math.floor(pos.x / RESOLUTION);\r\n  grid[row][col] = !grid[row][col];\r\n  sound.cloneNode().play();\r\n  (0,_indexRenderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ROWS, COLS, RESOLUTION, ctx);\r\n});\r\n\r\n// requestAnimationFrame によって一定間隔で更新・描画を行う\r\n// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)\r\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame\r\nfunction update() {\r\n  grid = (0,_indexUpdateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid, ROWS, COLS);\r\n  (0,_indexRenderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ROWS, COLS, RESOLUTION, ctx);\r\n  animationId = requestAnimationFrame(update);\r\n}\r\n\r\nstartButton.addEventListener(\"click\", () => {\r\n  // 既にアニメーションが動いている場合は何もしない\r\n  if (animationId) {\r\n    return;\r\n  }\r\n  update();\r\n});\r\n\r\npauseButton.addEventListener(\"click\", () => {\r\n  // アニメーションが停止している場合は何もしない\r\n  if (!animationId) {\r\n    return;\r\n  }\r\n  cancelAnimationFrame(animationId);\r\n  animationId = null;\r\n});\r\n\r\n(0,_indexRenderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ROWS, COLS, RESOLUTION, ctx);\r\n\n\n//# sourceURL=webpack://ex01/./ex05/index.js?");

/***/ }),

/***/ "./ex05/indexRenderGrid.js":
/*!*********************************!*\
  !*** ./ex05/indexRenderGrid.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n// grid を canvas に描画する\nfunction renderGrid(grid, ROWS, COLS, RESOLUTION, ctx) {\n    for (let row = 0; row < ROWS; row++) {\n        for (let col = 0; col < COLS; col++) {\n            const cell = grid[row][col];\n            ctx.beginPath();\n            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);\n            ctx.fillStyle = cell ? \"black\" : \"white\";\n            ctx.fill();\n            ctx.stroke();\n        }\n    }\n}\n\n//# sourceURL=webpack://ex01/./ex05/indexRenderGrid.js?");

/***/ }),

/***/ "./ex05/indexUpdateGrid.js":
/*!*********************************!*\
  !*** ./ex05/indexUpdateGrid.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\n// Life Game のルールに従ってセルを更新する\nfunction updateGrid(grid, ROWS, COLS) {\n    // 新しいグリッドを作成\n    const nextGrid = grid.map((arr) => [...arr]);\n\n    for (let row = 0; row < ROWS; row++) {\n        for (let col = 0; col < COLS; col++) {\n            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)\n            let count = 0;\n            for (let i = -1; i <= 1; i++) {\n                for (let j = -1; j <= 1; j++) {\n                    // 自分自身はカウントしない\n                    if (i === 0 && j === 0) {\n                        continue;\n                    }\n                    let newRow = row + i;\n                    let newCol = col + j;\n                    // 範囲外の場合はスキップ\n                    if (newRow < 0 || ROWS <= newRow || newCol < 0 || COLS <= newCol) {\n                        continue;\n                    }\n                    if (grid[newRow][newCol]) {\n                        count++;\n                    }\n                }\n            }\n            //誕生\n            if (!grid[row][col] && count === 3) {\n                nextGrid[row][col] = true;\n            }\n            //生存\n            else if (grid[row][col] && (count === 2 || count === 3)) {\n                nextGrid[row][col] = true;\n            }\n            //過疎\n            else if (grid[row][col] && count <= 1) {\n                nextGrid[row][col] = false;\n            }\n            //過密  \n            else if (grid[row][col] && count >= 4) {\n                nextGrid[row][col] = false;\n            }\n        }\n    }\n    return nextGrid;\n}\n\n//# sourceURL=webpack://ex01/./ex05/indexUpdateGrid.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ex05/index.js");
/******/ 	
/******/ })()
;