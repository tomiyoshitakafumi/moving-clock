export function counterGroup() {
    let count = 0;
    return {
        newCounter() {
            let n = 0;
            return {
                count: function () {
                    count++;
                    return n++;
                },
                reset: function () {
                    // count = 0;countはリセットしない
                    n = 0;
                }
            };
        },
        total() {
            return count;
        }
    };
}