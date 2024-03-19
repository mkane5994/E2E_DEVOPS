describe("LEP Warning Message(ITDS-2604)", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('new_business_lep_warning_message');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 
    
    /********************************************************************************************************
    ******************************* START WITH TEST *********************************************************
    *********************************************************************************************************
    Copy Quote
    User adds 8010836
    User adds 8010834
    Reprice
    Update Net Price
    Reprice
    Assert Change Request error message is present
    Update Net Price
    Reprice
    Assert Change Request error message is present
    Update Net Price
    Reprice
    Assert Change Request error message is present
    ********************************************************************************************************/
    //**************************************************************************************************************************
    //*************************************************************************************************************************
    //**************************************************** Start Test **********************************************************
    //**************************************************************************************************************************
    //**************************************************************************************************************************
    //********************************* Legacy equals Yes Products************************************
    
    it("Login to CPQ", async function() {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });
    
    it("Load the Quote", async function() {
        await cpqQuote.quote1.quote.handleOpenQuote('206087000007');
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("User adds 8010836", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8010836");
	    await util.browser.sleep(3000);
	    await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
	    await util.browser.sleep(7000);
    });
  
    it("01: Reprice", async function () {
        await cpqQuote.quote1.quote.clickReprice();
	    await util.browser.sleep(3000);
	    await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
	    await util.browser.sleep(40000);
    });

	it("Get close", async function () {
        let elem = await nonUi5.element.getByCssContainingText("DIV[class='pull-left']", "8010836");
        if (await nonUi5.element.isVisible(elem)) {
            let elem1 = await nonUi5.element.getByCssContainingText("DIV[class='pull-left']", "8010836");
            await nonUi5.assertion.expectToBeVisible(elem1, 2000);
        } else {
            await util.browser.sleep(4000);
        }
    });
	
    it("01: Update Net Price", async function () {
	    await cpqQuote.quote1.products.fillNetPriceDiscountPercCloud(1, "63.71");
	    await util.browser.sleep(3000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await util.browser.sleep(30000);
    });

	it("02: Reprice", async function () {
        await cpqQuote.quote1.quote.clickReprice();
        await util.browser.sleep(3000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await util.browser.sleep(3000);
    });

    it("01: Assert Change Request error message is present", async function () {	
        await cpqQuote.quote1.messages.expectMessage('1: Increase Net Price of identified line item(s) as entire deal is currently not eligible for Incentive Threshold');
    });

    it("02: Update Net Price", async function () {
		await cpqQuote.quote1.products.fillOpenNetPriceDiscountPercCloud(1, "75");
	    await util.browser.sleep(3000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await util.browser.sleep(3000);
    });

    it("03: Reprice", async function () {
        await cpqQuote.quote1.quote.clickReprice();
        await util.browser.sleep(3000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await util.browser.sleep(3000);
    });

    it("02: Assert Change Request error message is present", async function () {
        await cpqQuote.quote1.messages.expectMessage("1, 3: Increase Net Price of identified line item(s) as entire deal is currently not eligible for Incentive Threshold");
    });
 
    it("03: Update Net Price", async function () {
		await cpqQuote.quote1.products.fillOpenNetPriceDiscountPercCloud(1, "0");
	    await util.browser.sleep(3000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await util.browser.sleep(3000);
    });

    it("04: Reprice", async function () {
        await cpqQuote.quote1.quote.clickReprice();
        await util.browser.sleep(3000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await util.browser.sleep(3000);
    });

    it("03: Assert Change Request error message is present", async function () {
        await cpqQuote.quote1.messages.expectMessage("1: Increase Net Price of identified line item(s) as entire deal is currently not eligible for Incentive Threshold");
    });
});
