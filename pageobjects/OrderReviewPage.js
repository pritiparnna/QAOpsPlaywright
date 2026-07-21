const {expect} = require('@playwright/test');


class OrderReviewPage
{
    constructor(page)
    {
        this.page = page;

        this.countryField = page.locator("[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.userEmail= page.locator(".user__name [type='text']").first();

        this.submitButton = page.locator(".action__submit");
        this.thankYouMessage = page.locator(".hero-primary");
        this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode, countryName,username)
    {
        await this.countryField.type(countryCode,{delay:100});
        //await this.countryField.pressSequentially(countryName.substring(0,3));
    await this.dropdown.waitFor();
    let optionsCount=await this.dropdown.locator("button").count();
    for(let i=0;i<optionsCount;++i)
    {
        const text=await this.dropdown.locator("button").nth(i).textContent();
        if(text.trim() === countryName)
        {
            await this.dropdown.locator("button").nth(i).click();
            break;
        }   
    }
        await expect(this.userEmail).toHaveText(username);
    }
    async submitAndGetOrderId()
    {
        await this.submitButton.click();

        await expect(this.thankYouMessage)
            .toHaveText(" Thankyou for the order. ");

        const orderId = await this.orderIdText.textContent();

        return orderId;
    }
}
module.exports = { OrderReviewPage };

  