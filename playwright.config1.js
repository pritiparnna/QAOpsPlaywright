// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1,
  //workers :3,
  timeout: 60*1000,
  expect : {
    timeout : 50*1000,
  },
  reporter : 'html',
 
 projects:[
{
  name:'chrome',

  use: {

    browserName : 'chromium',
    headless : false,
    screenshot:'on',
    video:'retain-on-failure',
    ignoreHttpsErrors:true,
    permissions:['geolocation'],
    trace:'on',//off.on,retain-on-failure
    //...devices['Pixel 2'],
    viewport : {width:720,height:720},

   
   

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   
  }
},
{
  name:'firefox',

  use: {

    browserName : 'firefox',
    headless : true,
    screenshot:'on',
    trace:'on',//off.on,retain-on-failure

   
   

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   
  }
}
]

  
    
  
 
});
module.exports = config

