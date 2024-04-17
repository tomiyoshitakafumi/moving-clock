class TypedMap {
    constructor(keyType, valueType, entries) {
        //変更点
        this.map = new Map(entries);
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
                }
            }
        }
        //変更点
        // super(entries);
        this.keyType = keyType;
        this.valueType = valueType;
    }

    set(key, value) {
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }
        //変更点
        // return super.set(key, value);
        return this.map.set(key, value);
    }
}