describe("E2E_CPQ_Cloud_Part_3&2", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('new_business_quantity_based');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 

    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name: E2E_CPQ_Cloud_Part_3
     Step0: Load the Base Quote
     Step0: Switch to iFrame callidus_frame
     Step0: Wait for Quote to be loaded
     Step0: Wait for Quote to be loaded Fluent Wait
     ******************************
     **** Copy the Base Quote *****
     ******************************
     Click the ellipses
     Click 'Copy'
     Wait for Quote to be loaded
     **** Change Units Qty ****
     Get Net Price of Product '8000045'
     Click on Units Qty
     Change Units Qty from 0 to 10
     Assert change in Net Price
     Revert Applied Units Qty
     Assert Net Price after reverting Unit Qty
     Click on Save
      Step0: Load the Base Quote
     Step0: Switch to iFrame callidus_frame
     Step0: Wait for Quote to be loaded
     Step0: Wait for Quote to be loaded Fluent Wait
     ******************************
     **** Copy the Base Quote *****
     ******************************
     Click the ellipses
     Click 'Copy'
     Wait for Quote to be loaded
     **** Add Discount *****
     Get Net Price of Product '8013778'
     Wait until load is completed
     Click on the 'Discount %' field to enable editing
     Add Discount '50%'
     Wait until load is completed
     Assert Discounted Net Price
     Clear Applied Discount ('50%')
     Wait until load is completed
     Assert Net Price after clearing discount
     ********************************************************************************************************/
    const sCloudProduct = "8000045";
    const discountValue = "0.5";
    const productNumber = "8013778";
    const NET_PRICE = "Net Price";
    const DISCOUNT_PERCENT = "Discount %";

    //********************************* Load the Base Quote ************************************
    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("01: Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("206087000005");
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("Wait for copied Quote", async function () {
        await cpqQuote.quote1.quote.handleWaitForCopiedQuote();
    });

    //**************************************************** Change Units Qty *******************************************************

    it("Change Units Qty from 0 to 10", async function () {
        await cpqQuote.quote1.products.fillQuantity(10, 1)
    });

    it("01: Click on Reprice", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
    });

    it("Assert change in Net Price", async function () {
        await cpqQuote.quote1.products.expectNetPricesCloud("8000045", 1, "17,520.00", 4);
    }, 31000);

    it("Revert Applied Units Qty", async function () {
        await cpqQuote.quote1.products.fillQuantity(0, 1)
    }, 31000);

    it("02: Click on Reprice", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
    });

    it("Assert Net Price after reverting Unit Qty", async function () {
        await cpqQuote.quote1.products.expectNetPricesCloud("8000045", 1, "0.00", 1);
    });

    it("Click on Save", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
    });

    it("02: Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("117620000043");
    });

   
    //**************************************************** Add Discount *******************************************************
   
   
    it("Get Net Price of Product '8013778'", async function () {
        const elem = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[2]/td[4]/div/div[3]/div[2]`);
    });

    it("Click on the 'Discount %' field to enable editing", async function () {
        const elem = await nonUi5.element.getByXPath('//*[@id="RolledUpDiscountPercent_4"]');
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        await nonUi5.userInteraction.click(elem);
    });

    it("Add Discount %", async function () {
        const elem1 = await nonUi5.element.getByXPath(`//*[@id="RolledUpDiscountPercent_4_8"]`);
        await nonUi5.userInteraction.clearAndFill(elem1, "10");
    });

    it("Save the Quote", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
    });

    it("Assert Discounted Net Price", async function () {
        var elem = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]//td[div//span[text()="${productNumber}"]]/following-sibling::td[@data-title="${NET_PRICE}"]//a`);
        const netPrice = await nonUi5.element.getAttributeValue(elem, "value");
        await nonUi5.assertion.expectAttributeToBe(elem, netPrice, "value");
    });

    it("Click on the 'Discount %' field to enable editing", async function () {
        const elem = await nonUi5.element.getByXPath('//*[@id="RolledUpDiscountPercent_4"]');
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        await nonUi5.userInteraction.click(elem);
    });

    it("Clear Applied Discount ('10%')", async function () {   
        const elem1 = await nonUi5.element.getByXPath(`//*[@id="RolledUpDiscountPercent_4_8"]`);
        await nonUi5.userInteraction.clearAndFill(elem1, "0");
    });
    
    it("Assert Net Price after clearing discount", async function () {
        const elem = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]//td[div//span[text()="${productNumber}"]]/following-sibling::td[@data-title="${NET_PRICE}"]//a`);
        const netPrice = await nonUi5.element.getAttributeValue(elem, "value");
        await nonUi5.assertion.expectAttributeToBe(elem, netPrice, "value");
    });

});