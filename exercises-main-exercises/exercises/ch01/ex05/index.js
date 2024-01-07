export function abs(x) { // 絶対値を計算する関数。
    if (x >= 0) { // if文は、
        return x; // 比較がtrueの場合に、このコードを実行する。
    } // ここでif節が終わる。
    else { // 省略可能なelse節は、
        return -x; // 比較がfalseのときに実行される。
    } // 節に1文しかない場合は、中括弧は省略できる。
}

export function sum(array) { // 配列の要素の合計を計算する。
    let sum = 0; // sumの初期値を0にする。
    for(let x of array) { // 配列をループし、各要素をxに代入する。
        sum += x; // sumに各要素の値を加算する。
    } // ここでループが終わる。
    return sum; // sumを返す。
}
export function factorial(n) { // 階乗を計算する関数。
   
    if(n<0) {
        throw new Error("負の値が設定されています");
    }
    let product = 1; // 1からスタート。
    while (n > 1) { // ()中の式がtrueの間は{}中の文を繰り返す。
        product *= n; // product = product * n; の短縮表記。
        n--; // n = n - 1 の短縮表記。
    } // ループの最後。
    return product; // 計算結果を返す
    
}
