import { expect, test } from '@playwright/test';
import { chromium } from 'playwright';

test.describe('Product List Filtering', () => {

    test.beforeEach(async () => {
        let browser = await chromium.launch({
            // headless: false,
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        let page = await browser.newPage();
        await page.goto('http://localhost:8080/ch15.01-03/ex14/index.html');
    });

    test('"all"', async ({page}) => {
        await page.selectOption('[data-testid="select"]', 'all');
        await expect(page.locator('#productList li')).toHaveCount(3);
    });

    test(' "food"', async ({page}) => {
        await page.selectOption('[data-testid="select"]', 'food');
        await expect(page.locator('[data-testid="food1"]')).toBeVisible();
    });

    test(' "stationery"', async ({page}) => {
        await page.selectOption('#category-select', 'stationery');
        await expect(page.locator('[data-testid="stationery1"]')).toBeVisible();
        await expect(page.locator('[data-testid="stationery2"]')).toBeVisible();
    });
});