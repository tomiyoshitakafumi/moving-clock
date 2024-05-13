// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  // この関数を実装する
    const cache = new WeakMap();

    return (obj) => {
        if (!cache.has(obj)) {
            let result = f(obj);
            cache.set(obj, result);
            return result;
        }
        return cache.get(obj);
    };
}


