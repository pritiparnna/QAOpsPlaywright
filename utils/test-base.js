const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
      testDataForOrder:
      {
        username : "amitbaranpatra@gmail.com",
        password : "Amit@2710",
        productName : "ZARA COAT 3"
      }  
    }
)
