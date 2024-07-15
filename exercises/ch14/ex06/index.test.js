import { createMethodLogger } from './index.js';

describe('', () => {
    it('objのプロパティがfunction', () => {
        // Mock
        const mockObject = {
            add(a, b) {
                return a + b;
            },
            subtract(a, b) {
                return a - b;
            }
        };

        const {proxy, callHistory} = createMethodLogger(mockObject);
        const beforeCallTime = new Date();
        proxy.add(1, 2);
        proxy.subtract(5, 3);

        expect(callHistory[0].methodName).toBe('add');
        expect(callHistory[0].parameters).toEqual([1, 2]);
        expect(callHistory[0].timestamp.getTime()).toBeLessThanOrEqual(beforeCallTime.getTime() + 60000);//1分は誤差許容
        expect(callHistory[1].methodName).toBe('subtract');
        expect(callHistory[1].parameters).toEqual([5, 3]);
        expect(callHistory[1].timestamp.getTime()).toBeLessThanOrEqual(beforeCallTime.getTime() + 60000);//1分は誤差許容

    });
    it('objのプロパティがfunctionではない', () => {
        const mockObject = {
            x: 2
        };
        const {proxy, callHistory} = createMethodLogger(mockObject);
        expect(proxy.x).toBe(2);

    });
});