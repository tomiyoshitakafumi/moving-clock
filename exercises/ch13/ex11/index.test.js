import { retryWithExponentialBackoff } from './index.js';
import { jest } from '@jest/globals';

// jest.useFakeTimers();でsetTimeoutをモックして高速化出るか

test('retry一度呼び出しで成功するケース', async () => {
    const mockFunc = jest.fn().mockResolvedValue({status: 200});
    let response = await retryWithExponentialBackoff(mockFunc, 3);
    expect(response).toEqual({status: 200});
});

test('retry2度呼び出しで成功するケース', async () => {
    const mockFunc = jest.fn()
        .mockResolvedValueOnce({status: 500})
        .mockResolvedValueOnce({status: 200});
    let response = await retryWithExponentialBackoff(mockFunc, 3);
    expect(response).toEqual({status: 200});

});

test('maxRetry超えて失敗するケース', async () => {
    const mockFunc = jest.fn().mockResolvedValue({status: 500});
    await expect(retryWithExponentialBackoff(mockFunc, 3)).rejects.toThrow('Max retry exceeded');
}, 30000);