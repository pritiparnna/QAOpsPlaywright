const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', { timeout: 15 * 1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    this.username = username; // Store for use in other steps
    
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);

    // const countryName='India';
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashBoardPage = this.poManager.getDashBoardPage();
    await this.dashBoardPage.searchProductAddCart(productName);
    await this.dashBoardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', { timeout: 15 * 1000 }, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkOut();
});

When('Enter valid details and Place the order', { timeout: 15 * 1000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind", "India", this.username);
    this.orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify the order is present in the OrderHistoryPage.', { timeout: 15 * 1000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashBoardPage.navigateToMyOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);
    //await orderHistoryPage.searchOrderAndSelect(this.orderId);
    //await orderHistoryPage.getOrderId();
    await expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});
Given('a login to Ecommerce2 application with {string} and {string}', async function (username,password) {
    const userName=this.page.locator("#username");
    const signIn=this.page.locator("[class='btn btn-info btn-md']");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title());
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then('Verify Error message is displayed.', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});;


