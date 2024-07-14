//RegExpをextendできないか
export class IgnoreAccentPattern {
    constructor(glob) {
        //正準等価性
        this.glob = glob.toString();
        let regexpText;
        let source;
        let flags = "u";
        //正規表現リテラルのケース/〇〇/の抽出
        if (glob instanceof RegExp) {
            source = glob.source;
            flags = glob.flags;
        } else {
            source = glob;
        }
        regexpText = source.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.regexp = new RegExp(regexpText, flags);

    }

    toString() {
        return this.glob;
    }

    [Symbol.search](s) {
        let n = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return n.search(this.regexp);
    }

    [Symbol.match](s) {
        let n = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return n.match(this.regexp);
    }

    [Symbol.replace](s, replacement) {
        let n = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return n.replace(this.regexp, replacement);
    }

}