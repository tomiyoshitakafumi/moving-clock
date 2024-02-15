export function FiboWhile() {
    let f = [];
    f[0] = 1;
    f[1] = 1;
    let i = 2;
    while (i < 10) {
        f[i] = f[i - 1] + f[i - 2];
        i++;
    }
    return f;
}

export function FiboDoWhile() {
    let f = [];
    f[0] = 1;
    f[1] = 1;
    let i = 2;
    do {
        f[i] = f[i - 1] + f[i - 2];
        i++;
    } while (i < 10);
    return f;
}

export function FiboFor() {
    let f = [];
    f[0] = 1;
    f[1] = 1;
    for (let i = 2; i < 10; i++) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f;
}