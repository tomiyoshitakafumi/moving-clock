export async function retryWithExponentialBackoff(func, maxRetry) {
    await wait(100);
    for (let i = 1; i < maxRetry; i++) {
        let response = await func();
        if (response.status === 200) {
            return response;
        }
        await wait((2 ** i) * 1000);
    }
    throw new Error('Max retry exceeded');
}

function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}