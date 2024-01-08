import { Point } from "./index.js";

describe("math", () => {
    describe("Point", () => {

        it("プラスの座標が加算されるか", () => {
            let point = new Point(1, 2);
            point.add(1, 2);
            expect(point.x).toBe(2);
            expect(point.y).toBe(4);
        });
        let point2 = new Point(1, 2);
        it("マイナスの座標が加算されるか", () => {
            let point2 = new Point(1, 2);
            point2.add(-1, -2);
            expect(point2.x).toBe(0);
            expect(point2.y).toBe(0);
        });
    });
});
