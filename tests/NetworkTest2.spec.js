const { test,expect } = require('@playwright/test');


test('Security test request intercept', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const email = "amitbaranpatra@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Amit@2710");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    //await page.locator(".card-body b").first().waitFor();
    await page.locator(".btn-custom").nth(1).click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*"
        , route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=689a691b6f585eb60d705366' })
        //we changed the id (last 4 digits) from 4633 to 5366 in the url
    );
    await page.locator("button:has-text('View')").first().click();
    //await page.pause();
    await expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order');
});

