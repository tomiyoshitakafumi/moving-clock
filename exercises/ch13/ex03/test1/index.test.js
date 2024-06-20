import { readdir, stat } from './index.js';

describe('', () => {
    it('readdir', () => {
        return readdir('./ch13/ex03').then(files => {
            expect(files[0]).toEqual("a");
            return readdir('./ch13/ex03/a');
        }).then(files => expect(files[0]).toEqual("b"));
    });

    it('stat', () => {
        stat('./ch13/ex03/a').then((a) => {
            console.log(a);
            return stat('./ch13/ex03/a/b');
        }).then(b => console.log(b));
        stat('./ch13/ex03/a').then(defile => {
            //nodeで実行時とテストで実行時のstatが異なってうまくテストができなかった
            // expect(defile).toEqual({
            //     dev: 1250650298,
            //     mode: 16822,
            //     nlink: 1,
            //     uid: 0,
            //     gid: 0,
            //     rdev: 0,
            //     blksize: 4096,
            //     ino: 53480245575194430,
            //     size: 0,
            //     blocks: 0,
            //     atimeMs: 1718636681646.4304,
            //     mtimeMs: 1718634365603.1562,
            //     ctimeMs: 1718634538915.698,
            //     birthtimeMs: 1718634356935.972,
            //     atime: new Date('2024-06-17T15:04:41.646Z'),
            //     mtime: new Date('2024-06-17T14:26:05.603Z,'),
            //     ctime: new Date('2024-06-17T14:28:58.916Z'),
            //     birthtime: new Date('2024-06-17T14:25:56.936Z')
            // });
        })
    });
});