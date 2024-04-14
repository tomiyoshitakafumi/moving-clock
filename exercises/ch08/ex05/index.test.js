import { sequenceToObject } from './index.js';

describe('', () => {
    it('正常系', () => {
        expect(sequenceToObject('a', 1, 'b', 2, 'c', 3)).toEqual({a: 1, b: 2, c: 3});
    });
    // エラーをキャッチするためにはアロー関数でラップする
    it('引数が奇数個の場合はエラー', () => {
        expect(() => sequenceToObject('a', 1, 'b', 2, 'c')).toThrow('Invalid arguments');
    });

    it('奇数番でstring以外が入っているとエラー', () => {
        expect(() => sequenceToObject('a', 1, 'b', 2, 2, 3)).toThrow('Invalid arguments');
    });
    it('スプレッド演算子の入力ケース', () => {
        let arr = ['a', 1, 'b', 2, 'c', 3];
        expect(sequenceToObject(...arr)).toEqual({a: 1, b: 2, c: 3});
    });

});