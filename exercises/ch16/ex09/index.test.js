import request from 'supertest';
import url from "url";
import path from "path";
import app from './index.js';
import fs from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testFilePath = path.join(__dirname, 'example.html');
console.log(testFilePath);
//コマンドライン引数を設定したかったがうまくいかなかった。 404になる
process.argv[2] = testFilePath;
process.argv[3] = 8000;
const testFileContent = fs.readFileSync(testFilePath, 'utf8');

describe('all', () => {
    it('/test/mirror endpoint', async () => {
        const response = await request(app)
            .get('/test/mirror')
            .set('Accept', 'text/plain');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/plain/);
    });
    it('Other requests', async () => {
        const response = await request(app)
            .get('/hoge')
            .set('Accept', 'text/plain');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/plain/);
        expect(response.text).toBe(testFileContent);
    });
});