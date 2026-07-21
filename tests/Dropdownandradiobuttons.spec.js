const {test,expect} = require('@playwright/test');


test('UI Controls',async({page})=>
        {
           await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
           const userName=page.locator("#username");
           const signIn=page.locator("#signInBtn");
           const dropDown=page.locator("select.form-control")
           const documentLink=page.locator("[href*='documents-request']");
           await dropDown.selectOption("consult");
           await page.locator(".radiotextsty").last().click();
           await page.locator("button#okayBtn").click();
           
           console.log(await page.locator(".radiotextsty").last().isChecked());
           await expect(page.locator(".radiotextsty").last()).toBeChecked();
           await page.locator("input#terms").click()

           await expect(page.locator("input#terms")).toBeChecked();
           await page.locator("input#terms").uncheck();
           expect(await page.locator("input#terms").isChecked()).toBeFalsy();
           await expect(documentLink).toHaveAttribute("class","blinkingText");

           //await page.pause();



        });

        test.only('@Child window hadl',async({browser})=>
        {
            const context = await browser.newContext();
            const page = await context.newPage();
    
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const documentLink=page.locator("[href='https://rahulshettyacademy.com/documents-request']");
            const userName=page.locator("#username");
            const [newPage]=await Promise.all(
            [
                context.waitForEvent('page'),
                documentLink.click()
            ]);
            const text=await newPage.locator(".red").textContent();
            const arrayText=text.split("@");
            const domain=arrayText[1].split(" ")[0];
            //console.log(domain);
            await userName.fill(domain);
            //await page.pause();
            console.log(await userName.inputValue());

        });