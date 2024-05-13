import { TypeMap } from './index';

test('TypeMap', () => {
    class Foo {
    }

    const typeMap = new TypeMap();
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Foo, new Foo());

    expect(typeMap.get(String)).toBe('string');
    expect(typeMap.get(Number)).toBe(123);
    expect(() => typeMap.set(Date, "aaaa")).toThrow();
});