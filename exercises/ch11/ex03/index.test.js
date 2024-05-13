import { bigEndianToLittleEndian, littleEndianToBigEndian } from './index';

describe("Endian conversion", () => {
    test("converts from little endian to big endian correctly", () => {
        const input = new Uint32Array([0x12345678], [0xabcdfeff]);
        const expected = new Uint32Array([0x78563412], [0xfffecdab]);
        const result = littleEndianToBigEndian(input);
        expect(result).toEqual(expected);
    });

    test("converts from big endian to little endian correctly", () => {
        const input = new Uint32Array([0x12345678], [0xabcdfeff]);
        const expected = new Uint32Array([0x78563412], [0xfffecdab]);
        const result = bigEndianToLittleEndian(input);
        expect(result).toEqual(expected);
    });
});
//作ったはいいがこの関数のユースケースがあまり思いつかない