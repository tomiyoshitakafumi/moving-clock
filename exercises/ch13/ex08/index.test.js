import { fetchFirstFileSize, fetchSumOfFileSizes } from './index.js';
//ex04と同じ
describe('fetchFirstFileSize', () => {
    it('正常', done => {
        fetchFirstFileSize('./ch13/ex08/sample', (err, filesize) => {
            expect(filesize).toEqual(16);
            expect(err).toBeNull()
            done();
        });
    });
    it('filePathが間違っているとき', done => {
        fetchFirstFileSize('./aaa', (err, filesize) => {
            expect(err.code).toEqual('ENOENT');
            done();
        });
    });
    it('ファイルがない時', done => {
        fetchFirstFileSize('./ch13/ex08/noFile', (err, filesize) => {
            expect(err).toBeNull()
            expect(filesize).toBeNull()
            done();
        });
    });
})
describe('fetchSumOfFileSizes', () => {
    it('正常', done => {
        fetchSumOfFileSizes('./ch13/ex08/sample', (err, totalsize) => {
            expect(totalsize).toEqual(32);
            expect(err).toBeNull()
            done();
        });
    });
    it('filePathが間違っているとき', done => {
        fetchSumOfFileSizes('./aaa', (err, totalsize) => {
            expect(err.code).toEqual('ENOENT');
            done();
        });
    });
    it('ファイルがない時', done => {
        fetchSumOfFileSizes('./ch13/ex08/noFile', (err, totalsize) => {
            expect(err).toBeNull()
            expect(totalsize).toEqual(0);
            done();
        });
    });
})