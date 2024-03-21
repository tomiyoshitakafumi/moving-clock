export function reverse(str) {
    // 書記素クラスター（ユーザーが認識する文字）の境界で、入力を分割
    let segs = new Intl.Segmenter('ja', {granularity: 'grapheme'});
    const stringArray = [...segs.segment(str)].map(s => s.segment);
    let result = stringArray.reverse();
    return result.join("");
}
