import { sortJapanese, toJapaneseDateString } from './index';

test('sortJapanese sorts Japanese strings correctly', () => {
    const input = ['つ', 'っ', 'ば', 'は', 'ぱ'];
    const output = sortJapanese(input);
    expect(output).toEqual(['つ', 'っ', 'ば', 'は', 'ぱ']);
});

test('toJapaneseDateString formats date correctly', () => {
    const input = new Date(2022, 3, 2);
    const output = toJapaneseDateString(input);
    expect(output).toBe('令和4年4月2日');
});