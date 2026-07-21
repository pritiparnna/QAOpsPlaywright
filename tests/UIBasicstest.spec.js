const {test,expect} = require('@playwright/test');



test('Browser Context Playwright test',async({browser})=>
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
    await page.locator("[type='password']").fill("learning");
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
