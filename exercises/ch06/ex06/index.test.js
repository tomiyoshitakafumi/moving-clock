import { getAllProperty } from "./index.js";

test('独自プロパティ、継承プロパティが列挙可能な場合全てのプロパティが列挙される', () => {
  let symbol = Symbol('id');
  let o = {};
  Object.defineProperty(o, 'o', {
    value: 0,
    enumerable: true,
  });

  let obj = Object.create(o);

  obj["name"] = 'John';
  obj[symbol] = '12345';

  Object.defineProperty(obj, 'obj', {
    value: 0,
    enumerable: true,
  });

  const result = getAllProperty(obj);

  expect(result).toEqual(['name', 'obj', symbol, 'o']);
});

test('空', () => {
  const obj = {};

  const result = getAllProperty(obj);

  expect(result).toEqual([]);
});

test('独自プロパティ、継承プロパティが列挙不可なプロパティの場合　継承プロパティの列挙不可だけ表示されない', () => {
  let symbol = Symbol('id');

  let o = {};
  Object.defineProperty(o, 'o', {
    value: 0,
    enumerable: false,
  });

  let obj = Object.create(o);
  obj["name"] = 'John';
  obj[symbol] = '12345';
  Object.defineProperty(obj, 'obj', {
    value: 0,
    enumerable: false,
  });
  const result = getAllProperty(obj);

  expect(result).toEqual(['name', 'obj', symbol]);
});
