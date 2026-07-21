const {test,expect,request} = require('@playwright/test');
const {ApiUtils1} = require('../utils/ApiUtils1');
const loginPayload={userEmail:"amitbaranpatra@gmail.com",userPassword:"Amit@2710"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};
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
    
     
    
    const email="amitbaranpatra@gmail.com";
    const productName='ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>
        {
            //intercepting response - API Response -> {playwright fake response}->browser-> render the data on frontend
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    )
    
     await page.locator(".btn-custom").nth(1).click();
     await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
     console.log(await page.locator(".mt-4").textContent());
     //await page.pause();
    //  await page.locator("tbody").waitFor();
    //  let rows= page.locator("tbody tr");
    
     
});

//verify if order created is showing in history page
//Pre condition - create order