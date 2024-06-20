import { fetchFirstFileSize, fetchSumOfFileSizes } from './index.js';

describe('fetchFirstFileSize', () => {
    it('正常', () => {
        fetchFirstFileSize('./ch13/ex04/sample', (err, filesize) => {
            expect(filesize).toEqual(16);
            expect(err).toBeNull();
        });
    });
    it('filePathが間違っているとき', () => {
        fetchFirstFileSize('./aaa', (err, filesize) => {
            expect(err.code).toEqual('ENOENT');
        });
    });
    it('ファイルがない時', () => {
        fetchFirstFileSize('./ch13/ex04/noFile', (err, filesize) => {
            expect(err).toBeNull();
            expect(filesize).toBeNull();
        });
    });
})
describe('fetchSumOfFileSizes', () => {
    it('正常', () => {
        fetchSumOfFileSizes('./ch13/ex04/sample', (err, totalsize) => {
            expect(totalsize).toEqual(32);
            expect(err).toBeNull();
        });
    });
    it('filePathが間違っているとき', () => {
        fetchSumOfFileSizes('./aaa', (err, totalsize) => {
            expect(err.code).toEqual('ENOENT');
        });
    });
    it('ファイルがない時', () => {
        fetchSumOfFileSizes('./ch13/ex04/noFile', (err, totalsize) => {
            expect(err).toBeNull()
            expect(totalsize).toEqual(0);
        });
    });
})