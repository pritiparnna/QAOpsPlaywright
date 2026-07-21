const {test,expect,request} = require('@playwright/test');
const {ApiUtils}=require('../utils/ApiUtils');
const loginPayLoad={userEmail:"amitbaranpatra@gmail.com",userPassword:"Amit@2710"};
const orderPayLoad={orders:[{country:"India",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};

let response;


test.beforeAll( async({browser})=>
{
        //Login API
        const context = await browser.newContext();
    await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
    //these steps are needed fpr tracing beforeAll hook.

        const apiContext= await request.newContext(); 
        const apiUtils=new ApiUtils(apiContext,loginPayLoad);
        response= await apiUtils.createOrder(orderPayLoad);
         await context.tracing.stop({ path: 'trace-beforeAll.zip' });
         await context.close();
          //these two steps are needed fpr tracing beforeAll hook.
       
});

test('place the order',async({page})=>
{
   
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);
    
   
    //await page.goto("https://rahulshettyacademy.com/client");
    //await page.locator("#userEmail").fill(email);
    //await page.locator("#userPassword").fill("Amit@2710");
   // await page.locator("#login").click();
   // await page.waitForLoadState("networkidle");
    //await page.locator(".card-body b").first().waitFor();
    
    await page.goto("https://rahulshettyacademy.com/client");
    
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
   //  await page.pause();
     expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
