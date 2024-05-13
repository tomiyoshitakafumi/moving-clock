export class TypeMap {
    constructor() {
        this.map = new Map();
    }

    set(key, value) {
        //バリデーション
        if (value.constructor !== key) {
            throw new Error('error');
        }
        this.map.set(key, value);
    }

    get(key) {
        return this.map.get(key);
    }
}