import { expect, test } from '@playwright/test';

test.describe('Todo List E2E Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080/ch15.04-10/ex12/index.html');
        await page.fill('#new-todo', 'aa');
        await page.click('text=Add');
        await page.fill('#new-todo', 'bb');
        await page.click('text=Add');
        await page.fill('#new-todo', 'cc');
        await page.click('text=Add');
        await page.locator('.toggle').nth(2).click();
    });
    test('All', async ({page}) => {
        await page.click('#all');
        const contentLocators = await page.locator('.content').all();
        await expect(contentLocators[0]).toHaveText('aa');
        await expect(contentLocators[1]).toHaveText('bb');
        await expect(contentLocators[2]).toHaveText('cc');
        await expect(contentLocators).toHaveLength(3);
    });
    
    test('Acive', async ({page}) => {
        await page.click('#active');
        const contentLocators = await page.locator('.content').all();
        await expect(contentLocators[0]).toHaveText('aa');
        await expect(contentLocators[1]).toHaveText('bb');
        //表示されてないと検知ずるため
        await expect(contentLocators).toHaveLength(2);
    });

    test('completed', async ({page}) => {
        await page.click('#completed');
        const contentLocators = await page.locator('.content').all();
        await expect(contentLocators[0]).toHaveText('cc');
        await expect(contentLocators).toHaveLength(1);
    });
    test('delete', async ({page}) => {
        await page.click('.destroy');
        await page.click('#all');
        const contentLocators = await page.locator('.content').all();
        await expect(contentLocators[0]).toHaveText('bb');
        await expect(contentLocators[1]).toHaveText('cc');
        await expect(contentLocators).toHaveLength(2);
    });
});
