describe("ARTPUBCL_33_Cloud_New_Business_Item_Level_Actions", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('new_business_item_level_actions');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 

    //********************************* Load the Base Quote ************************************
    
    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("206087000003");
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("Wait for copied Quote", async function () {
        await cpqQuote.quote1.quote.handleWaitForCopiedQuote();
    });

    it("Add Product: 8000347", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8000340");
    });

    it("Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("Click on item action button", async function () {
        await cpqQuote.quote1.products.clickActionsProduct("8000340");
    });

    it("Copy the item", async function(){
       let elem = await nonUi5.element.getByXPath("//*[@id[starts-with(., 'popover')]]/div[2]//button[@title='Copy']");
       await nonUi5.userInteraction.scrollToElement(elem);
       await nonUi5.userInteraction.click(elem);
       await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
       // Confirmation popup
       elem = await nonUi5.element.getByXPath("//*[@id='confirmDialogContainer']//button[text()='OK']");
       await nonUi5.userInteraction.click(elem);
    });

    it("Delete the product", async function(){
        let elem = await nonUi5.element.getByXPath("//*[@id='itemsTable']/tr[2]/td[4]/div/div[1]/div/button");
        const index=2;
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        // Delete element
        elem = await nonUi5.element.getByXPath("//*[@id[starts-with(., 'popover')]]/div[2]//button[contains(@class,'btn-danger')]");
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        // Confirmation popup
        elem = await nonUi5.element.getByXPath("//*[@id='confirmDialogContainer']//button[text()='OK']");
        await nonUi5.userInteraction.click(elem);
    });


});
