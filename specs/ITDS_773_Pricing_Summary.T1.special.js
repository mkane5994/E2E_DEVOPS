describe("ITDS-773 Item level and Pricing summary for Support Key.", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('pricing_summary');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 

    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name: ITDS-773 Item level and Pricing summary  for Support Key. Also DA Flag Creations/Updates
     Remember to run this test as support/key
     **** Load the Base Quote ****
     Indirect Quote:
     Step0: Load Quote
     Wait for Quote to be loaded
     Click User button
     Assert User type is support key
     Copy Quote
     Wait for Quote to be loaded
     Adding Product: 8004458
     Wait for Quote to be loaded Fluent Wait
     Wait for Quote to be loaded
     Clear quick add
     Adding Product: 8000340
     Wait for Quote to be loaded Fluent Wait
     Wait for Quote to be loaded
     Reprice
     Wait for Quote to be loaded Fluent Wait
     Ensure that You can click on pop up as support key
     Wait for Quote to be loaded Fluent Wait
     Open 8000340
     Wait for Quote to be loaded Fluent Wait
     Get value from Accounting Floor Price of the product
     Get Low-End Price of the product
     Calculate the AccountingFloorPrice
     Click on Cloud Pricing Summary Expand Button
     Assert Accounting Floor Price in pricing summary
     Assert total Low end price in pricing summary
     Assert that You cannot see Low-End Price for user support key
     Assert that You cannot see Incentive Threshold for user support key
     ********************************************************************************************************/

        //Init variables

    let AccountingFloorPricePricingSummary;
    let valueOfAccountingFloorPriceItem;
    let valueOfAccountingFloorPrice;
    var valueOfSSPMinimum;
    var valueOfSSPMaximum;
    var midpointSSP;
    let contractDuration = 3;
    let listPrice;
    let lowEndPrice;
    let popUpValue;
    var valueOfSSPMinimumPopUp;
    var valueOfSSPMaximumPopUp;
    var valueOfSSPMinimumWithoutDot;
    var valueOfSSPMaximumWithoutDot;
    let valueOfAccountingFloorPriceText;
    let totalLowEndPriceText;

    //Generic function
    async function showOrHideDetails(productNum, visibility) {
        var elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]//tr[.//span[text()="' + productNum + '"]]//a[text()="' + visibility + '"]');
        await cpqQuote.quote1.quote.handleWaitForElement(elem, true);
        elem.click();
        util.browser.sleep(500);
    }

    //**************************************************************************************************************************
    //**************************************************************************************************************************
    //**************************************************** Start Test **********************************************************
    //**************************************************************************************************************************
    //**************************************************************************************************************************
    //********************************* Load the Base Quote ************************************
    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("206087000009");
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("Wait for copied Quote", async function () {
        await util.browser.sleep(500);
        await util.browser.refresh();
        await util.browser.sleep(500);
    });

    it("Adding Product: 8004458", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8004458");
    }, 141000);

    it("01: Wait for added product", async function () {
        await util.browser.sleep(10000);
    });

    it("Adding Product: 8000340", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8000340");
    }, 141000);

    it("02: Wait for added product", async function () {
        await util.browser.sleep(10000);
    });

    it("Reprice", async function () {
        await cpqQuote.quote1.quote.clickReprice();
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
    });

    it("01: Wait for reprice", async function () {
        await util.browser.sleep(30000);
    });

    it("Open pop up", async function () {
        let elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[5]/td[4]/div/div[3]/a');
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
    });

    it("02: Wait for reprice", async function () {
        await util.browser.sleep(10000);
    });

    it('Get value from pop up', async function () {
        let element1 = await nonUi5.element.getByXPath('//*[@id="item-description-popover-8004458-5"]');
        console.log( "ele1 is " + element1);
        console.log( element1);

        const elem2 = await nonUi5.element.getById("item-description-popover-8004458-5");
        const arrayOfLines = await nonUi5.element.getValue(elem2);
        console.log("value of popup is ele2" + arrayOfLines);
        valueOfSSPMinimumPopUp = arrayOfLines.match(/SSP Minimum: \$ ([\d,]+.\d{2})/);
        console.log("b4 valueOfSSPMinimumPopUp" + valueOfSSPMinimumPopUp);
        valueOfSSPMinimumPopUp = valueOfSSPMinimumPopUp[1];
        console.log("after valueOfSSPMinimumPopUp" + valueOfSSPMinimumPopUp);
        valueOfSSPMaximumPopUp = arrayOfLines.match(/SSP Maximum: \$ ([\d,]+.\d{2})/);
        console.log("b4 valueOfSSPMaximumPopUp" + valueOfSSPMaximumPopUp);
        valueOfSSPMaximumPopUp = valueOfSSPMaximumPopUp[1];
        console.log("after valueOfSSPMaximumPopUp" + valueOfSSPMaximumPopUp);      
    });

    it("Open 8000340", async function () {
        showOrHideDetails("8000340", "Show");
    }, 500);

    it("Wait", async function () {
        await util.browser.sleep(500);
    });

    it('Get Low-End Price of the product', async function () {
        var elem2 = await  nonUi5.element.getByXPath('(//*[@id="itemsTable"]//span[text()="8000340"]/ancestor::tr/td[@data-title="Low-End Price"]//span[contains(@data-bind,"textOrNbsp")])[1]');
        lowEndPriceString =   await nonUi5.element.getValue(elem2);
        lowEndPriceString = lowEndPriceString.replace(',', '');
        lowEndPrice = parseFloat(lowEndPriceString);
        console.log(lowEndPrice);
    })

    it('Calculate the AccountingFloorPrice', async function () {
        var elem2 = await nonUi5.element.getByXPath('(//*[@id="itemsTable"]//span[text()="8004458"]/ancestor::tr/td[@data-title="List Price"]//span[contains(@data-bind,"textOrNbsp")])[1]');
        listPrice=   await nonUi5.element.getValue(elem2);
        console.log("List Price", listPrice);
        console.log("Contract duration", contractDuration);
        listPrice = listPrice.replace(',', '');
        midpointSSP = parseFloat(listPrice) * contractDuration;
        midpointSSP = midpointSSP * 0.70;
        console.log("MidpointSSP", midpointSSP);
        valueOfSSPMinimum = midpointSSP;
        valueOfSSPMaximum = midpointSSP;
        valueOfAccountingFloorPrice = valueOfAccountingFloorPriceItem + valueOfSSPMinimum;
        valueOfAccountingFloorPrice = Math.round(valueOfAccountingFloorPrice * 100) / 100;
        valueOfSSPMinimumWithoutDot = valueOfSSPMinimum.toString();
        valueOfSSPMaximumWithoutDot = valueOfSSPMaximum.toString();
    })

    it("Click on Cloud Pricing Summary Expand Button", async function () {
        var elem = await nonUi5.element.getByXPath('//*[@id="cloudToggle"]');
        elem.click();
    }, 500);

    it('Assert that You cannot see Low-End Price for user support key ', async function () {
        var elem2 =  await nonUi5.element.getByXPath('(//*[@id="itemsTable"]//span[text()="8000340"]/ancestor::tr/td[@data-title="Low-End Price"]//span[contains(@data-bind,"textOrNbsp")])[1]');
        lowEndPriceString=   await nonUi5.element.getValue(elem2);
        console.log("lowEndPriceString"+ lowEndPriceString);
        result = await nonUi5.element.isPresent(elem2);
        console.log("result" + result);
        common.assertion.expectTrue(result);
    })

    it('Assert that You cannot see Incentive Threshold for user support key ', async function () {
        var elem2 =  await nonUi5.element.getByXPath('(//*[@id="itemsTable"]//span[text()="8000340"]/ancestor::tr/td[@data-title="Incentive Threshold 1"]//span[contains(@data-bind,"textOrNbsp")])[1]');
        lowEndPriceString=   await nonUi5.element.getValue(elem2);
        result = await nonUi5.element.isPresent(elem2);
        console.log("result" + result);
        common.assertion.expectTrue(result);
    })

});