import { cache } from './index';

test('cach', () => {
    function slowFn(obj) {
        // 時間のかかる処理
        obj.value++;
        return obj;
    }

    let obj = {value: 1};
    const obj2 = {value: 2};
    const cachedFn = cache(slowFn);
    expect(cachedFn(obj)).toEqual({value: 2});
    expect(cachedFn(obj)).toEqual({value: 2});
    expect(cachedFn(obj2)).toEqual({value: 3});
    //キャッシュがカベージコレクションになっているかのテストがわからず
});