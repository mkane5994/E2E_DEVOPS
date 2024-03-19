describe("ARTPUBCL_33_Cloud_New_Business_Blocked_Product_Check", function () {
    
    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('new_business_blocked_product_check');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 

    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name:ITPCPQ-4181 when A9 Blocked Product eg 8000935 is added to cart then raise error message..:
     **** Login to CPQ ****
     Step0: Load the Quote
     Wait for Quote to be loaded
     Copy Quote
     Wait for copied Quote to be loaded
     Add A7 Blocked Cloud Product to Cart - 8000347
     Wait for Quote to be loaded
     Assert Entitlement Set related error msg (Quote contains items which have A7/B7 status. Remove to proceed to Deal Approval) is raised"
     Add Blocked Cloud Product to Cart - 8000935
     Wait for Quote to be loaded 
     Assert Entitlement Set related error msg (Items & are Sunset Products which cannot be added to this Quote. Please have a look at the Material History tool in the Fiori Launchpad to...) is raised"
     ********************************************************************************************************/
    //**************************************************************************************************************************
    //**************************************************************************************************************************
    //**************************************************** Start Test **********************************************************
    //**************************************************************************************************************************
    //**************************************************************************************************************************
    //********************************* Load a Quote ************************************

    // Init variables
    const ERROR_MESSAGE_A7 = "Quote contains items 1 which have A7/B7 status. Remove to proceed to Deal Approval."
    const ERROR_MESSAGE_BTP = "Items 1 are Sunset Products which cannot be added to this Quote. Please have a look at the Material History tool in the Fiori Launchpad to see if there is a successor product"

    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("206087000004");
    });
    
    it("Click on Save", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
        await util.browser.sleep(5000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("Wait for copied Quote", async function () {
        await cpqQuote.quote1.quote.handleWaitForCopiedQuote();
    });

     //********************************* Add A7/B7 Cloud Product to Cart ************************************
     it("Add Blocked Cloud Product to Cart - 80000347", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8000347");
    });

    it("01: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("Assert Entitlement Set related error msg (Quote contains items 1 which have A7/B7 status. Remove to proceed to Deal Approval.) is raised", async function () {
        await cpqQuote.quote1.messages.expectMessage(ERROR_MESSAGE_A7);
    }, 31000);

    //********************************* Add BTP Cloud Product to Cart ************************************
    it("Add Blocked Cloud Product to Cart - 8000935", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8000935");
    });

    it("02: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("Assert Entitlement Set related error msg (Items 1 are Sunset Products which cannot be added to this Quote...) is raised", async function () {
        await cpqQuote.quote1.messages.expectMessage(ERROR_MESSAGE_BTP);
    }, 31000);

});
