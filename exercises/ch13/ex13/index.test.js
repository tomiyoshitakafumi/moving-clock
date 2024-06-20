import { walk } from "./index";

it("walk", async () => {
    let walkpath = await walk('./ch13/ex13/test');
    //windows環境の場合は、パスの区切り文字が'\\'になる
    let result1 = await walkpath.next();
    let result2 = await walkpath.next();
    let result3 = await walkpath.next();
    let result4 = await walkpath.next();
    let result5 = await walkpath.next();
    expect(result1.value).toEqual({path: 'ch13\\ex13\\test', isDirectory: true});
    expect(result2.value).toEqual({path: 'ch13\\ex13\\test\\test2', isDirectory: true});
    expect(result3.value).toEqual({path: 'ch13\\ex13\\test\\test2\\test3', isDirectory: true});
    expect(result4.value).toEqual({path: 'ch13\\ex13\\test\\test2\\test4', isDirectory: true});
    expect(result5.value).toEqual({path: 'ch13\\ex13\\test\\test2\\test4\\test.txt', isDirectory: false});
});
