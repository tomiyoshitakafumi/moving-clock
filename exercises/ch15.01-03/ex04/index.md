# グローバルオブジェクトを参照する方法

ブラウザ内: window
Node.js内: global
ブラウザとNode.js問わず: globalThis

# ブラウザ独自のプロパティやメソッド

window.alert():
window.document:
window.location:
window.history:
window.localStora:
window.sessionStoge:
window.fetch():
window.addEventListener()
window.requestAnimationFrame()
window.navigator:

# グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。

console.log(window.undefined); // こちらもundefinedが出力される
過去のES使用では、undefinedは変数として定義されていたため、undefinedという変数名が上書きされる可能性があった。
ES5以降は読み取り専用になった。