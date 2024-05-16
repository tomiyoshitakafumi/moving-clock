export function retryWithExponentialBackoff(func, maxRetry, callback) {
    let retryCount = 0;

    function retry() {
        retryCount++;
        if (func()) {
            callback(true);
            return;
        }
        if (retryCount <= maxRetry) {
            setTimeout(retry, (2 ** retryCount) * 1000);
        } else {
            callback(false);
        }
    }

    retry();
}