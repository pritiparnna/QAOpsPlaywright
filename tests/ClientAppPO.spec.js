const {test,expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const {POManager} = require('../pageobjects/POManager');
//JSON->String->JS Object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData')));

for(const data of dataSet)
{
//test('Client App login',async({page})=>
  test(` @Web Client App login for ${data.productName}`,async({page})=>
  

  {
    const poManager = new POManager(page);
    
   // const countryName='India';
    const loginPage = poManager.getLoginPage();;
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddCart(data.productName);
    await dashBoardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    cartPage.verifyProductIsDisplayed(data.productName);
    cartPage.checkOut();
    
      const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind","India",data.username);
    const orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(orderId);
     await dashBoardPage.navigateToMyOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    //await orderHistoryPage.searchOrderAndSelect(orderId);
    //await orderHistoryPage.getOrderId();
    await expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();


    
    

});
}
 customtest.only(`Client App login`,async({page,testDataForOrder})=>
  

  {
    const poManager = new POManager(page);
    
   // const countryName='India';
    const loginPage = poManager.getLoginPage();;
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    cartPage.checkOut();
  });