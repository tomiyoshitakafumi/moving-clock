import { retryWithExponentialBackoff } from './index.js';
import { jest } from '@jest/globals';

jest.useFakeTimers();
test('retry一度呼び出しで成功するケース', done => {
    const func = jest.fn(() => true);
    const callback = (result) => {
        expect(result).toBe(true);
        expect(func).toHaveBeenCalledTimes(1);
        done();
    };

    retryWithExponentialBackoff(func, 3, callback);
});

test('retry2度呼び出しで成功するケース', done => {
    let callCount = 0;
    const func = jest.fn(() => {
        callCount++;
        return callCount > 1;
    });
    const callback = (result) => {
        expect(result).toBe(true);
        expect(func).toHaveBeenCalledTimes(2);
        done();
    };

    retryWithExponentialBackoff(func, 3, callback);
    jest.runAllTimers();
});

test('maxRetry超えて失敗するケース', done => {
    const func = jest.fn(() => false);
    const callback = (result) => {
        expect(result).toBe(false);
        expect(func).toHaveBeenCalledTimes(4);
        done();
    };

    retryWithExponentialBackoff(func, 3, callback);
    jest.runAllTimers();
}, 30000);