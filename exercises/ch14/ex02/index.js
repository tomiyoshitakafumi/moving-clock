export class MyArrayLike {
  // TODO
  //なぜlengthの引数が入るのか謎こんな感じのを予想していた。後sliceはlenghtが入るがmapは入っていなかった。
  // constructor(items) {
  //   this.length = items.length;
  //   for (let i = 0; i < items.length; i++) {
  //     // MyArrayLikeインスタンスのi番目のプロパティとして設定    
  //   }
  //   this[i] = 3;
  // }
  constructor(length) {
    this.length = length;
  }

}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // TODO
  static get [Symbol.species]() {
    return MyArrayLike;
  }

  //map　sliceなどの新しい配列を返す物はnew this.constructor[Symbol.species]()が呼ばれる
}
