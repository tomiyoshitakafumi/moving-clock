export function sortJapanese(arr) {
    const collator = new Intl.Collator('ja', {sensitivity: 'base'}).compare;
    return arr.sort(collator);
}

export function toJapaneseDateString(date) {
    //元号が含まれているロケータ
    const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
        //日付全体の書式変更
        dateStyle: 'long'
    });
    return formatter.format(date);
}