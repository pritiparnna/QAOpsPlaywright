const ExcelJs=require('exceljs');
const {test,expect} = require('@playwright/test');

async function writeExcelTest(searchText,replaceText,change,filepath)
{
    
const workbook=new ExcelJs.Workbook();
//workbook.xlsx.readFile('/Users/amitpatra/Downloads/exceldownloadDemo.xlsx').then(function()
await workbook.xlsx.readFile(filepath);

const worksheet=workbook.getWorksheet('Sheet1');
const output=await readExcel(worksheet,searchText);
     const cell=worksheet.getCell(output.row,output.column+change.columnChange); //3rd
        cell.value=replaceText;//got replaced not saved yet.
       await workbook.xlsx.writeFile(filepath); //saved the file with new value.

}
async function readExcel(worksheet,searchText)
{
    let output={row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
{
        
     row.eachCell((cell,colNumber) =>
     {
         if(cell.value ===searchText)
             {
                //console.log(rowNumber);
                 output.row=rowNumber;    //2nd
                 //console.log(colNumber);
                 output.column=colNumber;
            }
             //console.log(cell.value);     1st
     })
})
return output;
}


//writeExcelTest('Mango',350,{rowChange:0,columnChange:2},'/Users/amitpatra/Downloads/exceldownloadDemo.xlsx');

test("upload download excel validation",async({page})=>
{
    const textSearch = "Mango";
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    await downloadPromise;
    writeExcelTest('Mango',350,{rowChange:0,columnChange:2},'/Users/amitpatra/Desktop/download.xlsx');
    await page.locator("#fileinput").click();
     await page.locator("#fileinput").setInputFiles('/Users/amitpatra/Desktop/download.xlsx');
     const textlocator = page.getByText(textSearch);
     const desiredRow = await page.getByRole('row').filter({has:textlocator});
     await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);


});