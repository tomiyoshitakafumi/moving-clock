import globals from "globals";
import pluginReact from "eslint-plugin-react";
import googleConfig from "eslint-config-google";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginReact.configs.flat.recommended,
  {
    ...googleConfig,
    rules: {
      ...googleConfig.rules,
      "valid-jsdoc": "off",
      "require-jsdoc": "off"
    }
  },
];
//Google JavaScript スタイルガイドのeslitnがあったので使ってみた。(jsdocを無効化にしないとダメだったが)

///home/tomiyoshi/source/RICOH-JStraining/exercises/ch17/ex01/lint_sample.js
// 4: 1  error  Parsing error: 'with' in strict mode
// ✖ 1 problem(1 error, 0 warnings)