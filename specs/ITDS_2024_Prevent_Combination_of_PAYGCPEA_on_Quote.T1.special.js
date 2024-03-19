describe("ITDS-2024 Prevent Combination of PAYG/CPEA on Quote", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('new_business_prevent_combination_of_PAYGCPEA');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 

    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name: ITDS-2024 Prevent Combination of PAYG/CPEA on Quote
     ****
     Login to CPQ
     Load Quote
     Copy Quote
     Wait for copied Quote
     User add product with PAYG attached: 8003795
     Wait for added product
     User add PAYG: 8007848
     Wait for added product
     User add CPEA product into the basket: 8005605
     Wait for added product
     Open error messsages pop up
     Wait
     Expand the message
     ********************************************************************************************************/

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
        await cpqQuote.quote1.quote.handleOpenQuote("206087000006");
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("Wait for copied Quote", async function () {
        await cpqQuote.quote1.quote.handleWaitForCopiedQuote();
    });

    it("User add product with PAYG attached: 8003795", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8003795");
    }, 141000);

    it("01: Wait for added product", async function () {
        await util.browser.sleep(5000);
    });

    it("User add PAYG: 8007848", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8007848");
    }, 141000);

    it("02: Wait for added product", async function () {
        await util.browser.sleep(5000);
    });

    it("User add CPEA product into the basket: 8005605", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8005605");
    }, 141000);

    it("03: Wait for added product", async function () {
        await util.browser.sleep(5000);
    });

    it("Open error messsages pop up", async function () {
        let elem = await nonUi5.element.getByXPath(".//*[@id='openErrorMessagesDialog']");
        await nonUi5.userInteraction.click(elem);
    }, 141000);

    it("Wait", async function () {
        await util.browser.sleep(1000);
    });

    it("Expand the message", async function () {
        let elem = await nonUi5.element.getByXPath('//*[@id="messageList"]/ul/li[2]/a');
        await nonUi5.userInteraction.click(elem);
    });

});
