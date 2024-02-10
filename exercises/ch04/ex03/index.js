export function chatGPT(a, b) {
    while (b ^ 0) {
        let borrow = ~a & b; //借りの計算
        a = a ^ b; // 差の計算
        b = borrow << 1; // 借りの更新
    }
    return a;
}


export function add(a, b) {
    if (!(b ^ 0)) return a;//繰り上がりが発生しなかった場合(b===0)は加算終了

    // 加算をした際に繰り上がりがあるビット列とないビット列を分けて考える
    let s = a ^ b;// 繰り上りがが発生しないビット列
    let c = a & b;   // 繰り上がりが発生するビット列
    c <<= 1; // 繰り上がりが発生するビット列を再帰で再度加算するため繰り上げ
    return add(s, c);
}

export function sub(a, b) {
    // bを2の補数にするためbのビットを反転させ1を加算
    return add(a, add(~b, 1));
}