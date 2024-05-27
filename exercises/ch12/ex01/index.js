function counterIter(max) {
    console.log("counterIter");
    let c = 1;
    return {
        [Symbol.iterator]() {
            console.log("counterIter: Symbol.iterator");
            return this;
        },
        next() {
            console.log("counterIter: next");
            if (c >= max + 1) {
                return {value: undefined, done: true};
            }
            const value = c;
            c++;
            return {value, done: false};
        },
        return(value) {
            console.log("counterIter: return:", value);
            return {value, done: true};
        },
        throw(e) {
            console.log("counterIter: throw:", e);
            throw e;
        },
    };
}

function* counterGen(max) {
    console.log("counterGen");
    try {
        for (let c = 1; c <= max; c++) {
            console.log("counterGen: next");
            yield c;
        }
    } catch (e) {
        console.log("counterGen: catch:", e);
    } finally {
        console.log("counterGen: finally");
    }
}

// 明示的にイテレータインタフェース のメソッドを呼んだり、間接的に呼んだりする
let a = counterIter();
[...a];///処理が終わらずに落ちる
let b = counterIter(3);
[...b];//[1,2,3]
let c = counterIter(3);
c.next();//{done:false value:1}
c.next();//{done:false value:2}
c.next();//{done:false value:3}
c.next();//{done:true value:undefined}
c.next();//{done:true value:undefined}

let c = counterGen(3);
c[Symbol.iterator]()
// counterIter: Symbol.iterator
// next    :    ƒ next()
// return: return(value)
// throw: throw(e)
// Symbol(Symbol.iterator):ƒ [Symbol.iterator]()
// [[Prototype]]:Object

// ジェネレータ関数によって生成されたオブジェクトがイテレータインタフェースを満たしていることを確認する
//オブジェクトはnext()メソッドを持ち、そのメソッドはvalueとdoneプロパティを持つオブジェクトを返す必要がある。retrun とthrowは任意
let d = counterGen(3)
d.next().value;//1
d.next().value;//2
d.next().value;//3
d.next().done;//counterGen: finally true

// return() や throw() がどのようなときに呼ばれるのか確認する
//counterIterのreturn()やthrow()は呼ばれない?

// ジェネレータ関数の中身がどのタイミングで初めて実行されるか確認する
//counterGenの中身はnext()が呼ばれるまで実行されない