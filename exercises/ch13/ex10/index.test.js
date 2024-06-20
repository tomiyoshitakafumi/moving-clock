import { fetchSumOfFileSizes } from './index.js';
//ex04と同じ
describe('fetchSumOfFileSizes', () => {
    it('正常', () => {
        fetchSumOfFileSizes('./ch13/ex08/sample', (err, totalsize) => {
            expect(totalsize).toEqual(32);
            expect(err).toBeNull()
        });
    });
    it('filePathが間違っているとき', () => {
        fetchSumOfFileSizes('./aaa', (err, totalsize) => {
            expect(err.code).toEqual('ENOENT');
        });
    });
    it('ファイルがない時', () => {
        fetchSumOfFileSizes('./ch13/ex08/noFile', (err, totalsize) => {
            expect(err).toBeNull()
            expect(totalsize).toEqual(0);
        });
    });
})