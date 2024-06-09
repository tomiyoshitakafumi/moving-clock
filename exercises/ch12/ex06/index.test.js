import { walk } from "./index";

it("walk", () => {
    let walkpath = walk('./ch12/ex06/test');
    //windows環境の場合は、パスの区切り文字が'\\'になる
    expect(walkpath.next().value).toEqual({path: 'ch12\\ex06\\test', isDirectory: true});
    expect(walkpath.next().value).toEqual({path: 'ch12\\ex06\\test\\test2', isDirectory: true});
    expect(walkpath.next().value).toEqual({path: 'ch12\\ex06\\test\\test2\\test3', isDirectory: true});
    expect(walkpath.next().value).toEqual({path: 'ch12\\ex06\\test\\test2\\test4', isDirectory: true});
    expect(walkpath.next().value).toEqual({path: 'ch12\\ex06\\test\\test2\\test4\\test.txt', isDirectory: false});
});
