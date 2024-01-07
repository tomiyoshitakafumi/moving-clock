export function abs(x) { // 絶対値を計算する関数。
    if (x >= 0) { // if文は、
        return x; // 比較がtrueの場合に、このコードを実行する。
    } // ここでif節が終わる。
    else { // 省略可能なelse節は、
        return -x; // 比較がfalseのときに実行される。
    } // 節に1文しかない場合は、中括弧は省略できる。
} 