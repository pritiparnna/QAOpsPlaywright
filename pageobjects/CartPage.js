const {expect} = require('@playwright/test');
class CartPage
{
    constructor(page)
    {
        this.page=page;
    this.cartProducts = page.locator("div li").first();
    this.productTitles= page.locator(".card-body b");
      this.cart=page.locator("button[routerlink*='cart']");
      this.orders=page.locator("button[routerlink*='myorders']");
      this.checkout=page.locator("text=Checkout");
     
    }
    async verifyProductIsDisplayed(productName)
    {
        const productLocator = this.getProductLocator(productName);
        await productLocator.waitFor({timeout: 20000});
        const bool = await productLocator.isVisible();
        expect(bool).toBeTruthy();
    }
    async checkOut()
    {
        await this.checkout.click();;

    }
    getProductLocator(productName)
    {
        return this.page.locator(`h3:has-text('${productName}')`);
    }
}
module.exports ={CartPage};