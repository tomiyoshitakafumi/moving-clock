import { checkEntry } from './index';

describe('file', () => {
    it('should return "file" for a file path', () => {
        expect(checkEntry('ch16/ex07/index.js')).toBe('file');
    });

    it('directory', () => {
        expect(checkEntry('ch16/ex07/testFolder')).toBe('directory');
    });

    it('not found', () => {
        expect(checkEntry('ch16/ex07/notFile')).toBe('not found');
    });
});