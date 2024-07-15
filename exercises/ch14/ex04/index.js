export class Primitive {
    //ひらがな1文字だとソートの実装は必要ない？
    constructor(char) {
        this.char = char;
        this.codeUnit = char.charCodeAt(0);
    }

    [Symbol.toPrimitive](type) {
        if (type === 'number') {
            return this.codeUnit;
        } else {
            return this.char;
        }
    }
}