const {test,expect} = require('@playwright/test');

test('@QW security test request intercept',async({page})=>
{
     await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("amitbaranpatra@gmail.com");
    await page.locator("#userPassword").fill("Amit@2710");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".btn-custom").nth(1).click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue(
        {
            url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a04c23c965c23b43b173645"
        } )     
    )
    await page.locator("button:has-text('View')").first().click();
    //await page.pause();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
});