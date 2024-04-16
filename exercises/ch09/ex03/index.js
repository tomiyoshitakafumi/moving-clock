export class C1 {
    #x = 42;

    get getX() {
        return this.#x;
    }
}

export function C2() {
    let x = 42;
    return {
        getx() {
            return x;
        }
    }
}