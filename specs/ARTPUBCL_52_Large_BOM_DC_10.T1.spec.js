describe("ARTPUBCL-52_Large_BOM_DC_10", function () {
    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('large_bom_delta');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process /////////  

    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name: ARTPUBCL_52_Large_BOM_DC_10
        Login to CPQ
        Load the Large BOM Quote
        Copy Quote
        Click on reprice on DC-10 large BOM
    ********************************************************************************************************/
    const quote = "258888000018";

    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote(quote);
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote(360000);
    });

    it("Click on reprice on DC-10 large BOM", async function () {
        await cpqQuote.quote1.quote.clickReprice();
    });
});