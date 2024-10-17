import { test, expect } from '@playwright/test';

// webServer: {
//   command: "node /ch16/ex11/index.js",
//   port: 8000,
// 追加
test.describe('E2E Test for index.js', () => {

    test('GET / ', async ({ page }) => {
        await page.goto('http://localhost:8000');
        const title = await page.title();
        expect(title).toBe('Greeting Form');
    });

    test('POST /greeting ', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.fill('#name', 'World');
        await page.fill('#greeting', 'Hello');
        await page.click('button[type="submit"]');
        const content = await page.textContent('div');
        expect(content).toBe('Hello, World!');
    });
    test(' 404', async ({ page }) => {
        const response = await page.goto('http://localhost:8000/nonexistent');
        const body = (await response.text()).trim();
        expect(body).toBe('404 Not Found');
    });
});