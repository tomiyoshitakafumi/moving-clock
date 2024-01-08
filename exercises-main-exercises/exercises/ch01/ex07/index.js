export class Point { // クラス名は大文字から記述するのが慣習。
    constructor(x, y) { // 新しいインスタンスを初期化するコンストラクタ関数。
        this.x = x; // thisキーワードで、初期化中のオブジェクトを参照できる。
        this.y = y; // 関数の引数をオブジェクトのプロパティとして保存する。
    } // return文は必要ない。

    distance() { // 原点からの距離を計算するメソッド。
        return Math.sqrt( // x² + y² の平方根を返す。
            this.x * this.x + // thisが参照しているのは
            this.y * this.y // distanceメソッドが呼び出されているオブジェクト。
        );
    }

    add(x, y) {
        this.x += x;
        this.y += y;
    }
}
