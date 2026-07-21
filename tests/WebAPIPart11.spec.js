const {test,expect,request} = require('@playwright/test');
const {ApiUtils1} = require('../utils/ApiUtils1');
const loginPayload={userEmail:"amitbaranpatra@gmail.com",userPassword:"Amit@2710"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll( async()=>
{
const apiContext=await request.newContext();
const apiUtils1 = new ApiUtils1(apiContext,loginPayload);
 response= await apiUtils1.createOrder(orderPayload);



});


test('Place the order',async({page})=>
{
    

    page.addInitScript(value =>
    {
               window.localStorage.setItem('token',value);
               },response.token);
    
     
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Amit@2710");
    // await page.locator("#login").click();
    // await page.waitForLoadState("networkidle");
    // await page.locator(".card-body b").first().waitFor();
    const email="amitbaranpatra@gmail.com";
    const productName='ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");
//     const products=page.locator(".card-body");
//      //await page.waitForLoadState("networkidle");
//     await page.locator(".card-body b").first().waitFor();
    
//     const titles=await page.locator(".card-body b").allTextContents();
//     console.log(titles);
//     const count=await products.count();
//     for(let i=0;i<count;++i)
//     {
//         if(await products.nth(i).locator("b").textContent() === productName)
//         {
//             await products.nth(i).locator("text= Add To Cart").click();
//             break;
//         }
//     }
    
//    await page.locator("[routerlink*='cart']").click();
//     await page.locator("div li").first().waitFor();
//     const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//     expect(bool).toBeTruthy();
//     await page.locator("text=Checkout").click();
//     await page.locator("[placeholder*='Country']").pressSequentially("ind");
//     const dropDown=page.locator(".ta-results");
//     await dropDown.waitFor();
//     const optionCount=await dropDown.locator("button").count();
//     for(let i=0;i<optionCount;++i)
//     {
//         const text=await dropDown.locator("button").nth(i).textContent();
//         if(text === " India")
//         {
//             await dropDown.locator("button").nth(i).click();
//             break;
//         }
//     }
//     //await page.pause();
//     await expect(page.locator(".details__user div [type='text']").first()).toHaveText(email);
//     await page.locator(".action__submit").click();
//     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//      const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//      console.log(orderId);
     await page.locator(".btn-custom").nth(1).click();
     await page.locator("tbody").waitFor();
     let rows= page.locator("tbody tr");
    
     for(let i=0;i<await rows.count();++i)
     {
        const rowOrderId=await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
     }
     const orderIdDetails=await page.locator(".col-text").textContent();  //no need to give wait here as textContent() has autowaiting capasity.
     expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

//verify if order created is showing in history page
//Pre condition - create order