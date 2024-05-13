export function littleEndianToBigEndian(arr) {
    //4byte(32bit)×要素数確保
    const buffer = new ArrayBuffer(arr.length * 4);
    const view = new DataView(buffer);
    for (let i = 0; i < arr.length; i++) {
        view.setUint32(i * 4, arr[i], true);// 4byteをリトルエディアンに格納
    }
    const result = new Uint32Array(arr.length);
    for (let i = 0; i < result.length; i++) {
        result[i] = view.getUint32(i * 4, false);
    }
    return result;
}

export function bigEndianToLittleEndian(arr) {
    const buffer = new ArrayBuffer(arr.length * 4);
    const view = new DataView(buffer);
    for (let i = 0; i < arr.length; i++) {
        view.setUint32(i * 4, arr[i], false);
    }
    const result = new Uint32Array(arr.length);
    for (let i = 0; i < result.length; i++) {
        result[i] = view.getUint32(i * 4, true);
    }
    return result;
}