const {test,expect} = require('@playwright/test');



test('@Web Browser Context Playwright test',async({browser})=>
{
   
    const context = await browser.newContext();
    // chrome - plugins/cookies/proxies
    const page = await context.newPage();
   //1 page.route('**/*.css', route => route.abort()); // Block all CSS files
    const userName=page.locator("#username");
    const signIn=page.locator("[class='btn btn-info btn-md']");
    const cardTitle=page.locator(".card-body .card-title");
   
   
  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());
    const allTitles=await cardTitle.allTextContents();
    const allTitles1=  allTitles.map(title => title.trim());
    console.log(allTitles1);
    await expect(allTitles1).toContain("iphone X");
});
test('Page Playwright test',async({page})=>
    {
       
        await page.goto("https://google.com")
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");
    });
    test('@Web UI Controls',async({page})=>
        {
           
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
            const userName=page.locator("#username");
             const signIn=page.locator("[class='btn btn-info btn-md']");
             const documentLink=page.locator("[href='https://rahulshettyacademy.com/documents-request']");
             const dropdown = page.locator("select.form-control");
             await dropdown.selectOption("consult");
             await page.locator(".radiotextsty").last().click();
            await page.locator("#okayBtn").click();
             console.log(await page.locator(".radiotextsty").last().isChecked());
             await expect(page.locator(".radiotextsty").last()).toBeChecked();
             await page.locator("#terms").click();
             await expect(page.locator("#terms")).toBeChecked();
             await page.locator("#terms").uncheck();
             expect(await page.locator("#terms").isChecked()).toBeFalsy();
             await expect(documentLink).toHaveAttribute("class","blinkingText");
             //assertion
             //await page.pause();
        });
        test('@Child window hadl',async({browser})=>
            {
                const context = await browser.newContext();
                const page = await context.newPage();
                const userName=page.locator("#username");
                await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
                const documentLink=page.locator("[href='https://rahulshettyacademy.com/documents-request']");
                const [newPage]=await Promise.all(
               [
                context.waitForEvent('page'),//listen for any new page.
                documentLink.click(),       //new page is opened.
                ])
              const text = await newPage.locator("p.red").textContent();
              const arrayText= text.split("@");
              const domain=arrayText[1].split(" ")[0];
              console.log(domain);
              await page.locator("#username").fill(domain);
             // await page.pause();  
              console.log(await page.locator("#username").textContent());              

                

                
            });