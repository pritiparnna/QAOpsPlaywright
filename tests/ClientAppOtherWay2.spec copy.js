const {test,expect} = require('@playwright/test');

test('Client App login',async({page})=>
{
    const email="amitbaranpatra@gmail.com";
    const productName='ZARA COAT 3';
    const products=page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Amit@2710");
    await page.getByRole("button",{name: 'Login'}).click();
    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:'ADD TO CART'}).click();
    //await page.pause();
    await page.getByRole("listitem").getByLabel("button",{name:'cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await page.get
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdown=page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount=await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;++i)
    {
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }   
    }
    await expect( page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows= page.locator("tbody tr");
    for(let i=0;i<await rows.count();++i)
    {
        const rowOrderId=await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails=await page.locator(".col-text").textContent();
    await expect(orderId.includes(orderIdDetails)).toBeTruthy();

});