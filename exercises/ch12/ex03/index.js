export function* counter() {
    let count = 0;
    while (true) {
        try {
            yield count++;
        } catch (e) {
            count = 0;
        }
    }
    //これだと0からスタートするがthrowを使った時に1からスタートしてしまう
}