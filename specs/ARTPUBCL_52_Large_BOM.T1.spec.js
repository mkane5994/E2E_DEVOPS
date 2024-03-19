describe("ARTPUBCL-52_Large_BOM", function () {
    let payload = require("../data/ICT_OpportunityData.json");
    let quotePayload = require("../data/CPQT_QuoteData.json");
    let response = {};
    let sOppId = "";
    let attendance;
    let quoteNumber;

    // URL
    const url = `${browser.config.params.systemUrl}/sap/opu/odata/sap/zharmony_callidus_srv/`;
    const cpqUrl = "https://sap-ies-sales-test.cpq.cloud.sap";

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
     Test Name: ARTPUBCL_52_Large_BOM
        Login to CPQ
        Load the Large BOM Quote
        Click open link in formula validator
        Switch to iframe
        Enter text in text area
        Click on parse string button
        Verify the Result: Net TCV value < LEP, so SSP = LEP
        Switch to default content
        Move up product
        Switch to iframe
        Enter text in text area
        Click on parse string button
        Verify the Result: Net TCV value > IT2, so SSP = IT2
        Switch to default content
        Update Net Price
        Click on reprice
        Switch to iframe
        Enter text in text area
        Click on parse string button
        Verify the Result: LEP < Net TCV value < IT2, so SSP = Net TCV
    ********************************************************************************************************/

    it("Init service", async function () {
        attendance = await opportunity.harmonyQuote.createOpportunityAPI.initService(url, testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordBE);
    });

    it("Prepare data [1]", async function () {
        payload.directStandard.DESCRIPTION = "QMateDealDirectAPI1_" + ((new Date()).toString()).substr(4, 20);
        payload.directStandard.STARTDATE = new Date();
    });

    it("Create Deal [1]", async function () {
        response = await opportunity.harmonyQuote.createOpportunityAPI.createDeal(attendance, payload.directStandard);
        util.console.log("Created Opportunity ID ->" + response.OPPT_ID, "cyan");
        sOppId = response.OPPT_ID;
        await util.browser.sleep(4000);
    });

    it("Create Quote 1 from reuse [1]", async function () {
        quoteNumber = await cpqQuote.quote1.createQuoteAPI.createCPQQuotecompact(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, cpqUrl, quotePayload.directQuoteClean, payload.directStandard, sOppId);
        console.log(quoteNumber);
    });

    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });
    
    it("Login Sap Cloud", async function () {
        await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppDealList();
        await opportunity.harmonyQuote.hqOverall.loginSapCloudSAML2(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordSAPCloud);
    });

    it("Load the Quote", async function () {
        await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppOpportunityQuote(sOppId, quoteNumber);
    });

    it("Switch to iframe", async function () {
        await util.browser.switchToIframe("iframe[id='__xmlview1--callidus_frame']");
    });

    it("Add product", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8003376");
    });

    it("Add product", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8004685");
    });

    it("Click Save Quote", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
    });

    it("Click open link in formula validator", async function () {
        await cpqQuote.quote1.quote.clickOpenLinkInFormulaValidator();
    });

    it("Switch to iframe", async function () {
        await util.browser.switchToIframe("#debuggerIframe");
    });

    it("Enter text in text area", async function () {
        const elem = nonUi5.element.getByXPath('//textarea[@id="txtFormula"]');
        await nonUi5.userInteraction.clearAndFill(elem, '<*CTX(Quote.CurrentItem.CustomField(SSP))*>');
        await util.browser.sleep(2000);
    });

    it("Click on parse string button", async function () {
        const elem = nonUi5.element.getByXPath('//input[@id="btnParseString"]');
        await nonUi5.userInteraction.click(elem);
    });

    it("Verify the Result: Net TCV value < LEP, so SSP = LEP", async function () {
        const elem = await nonUi5.element.getByXPath('//textarea[@id="txtResult"]');
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        expect(await elem.getText()).toEqual('641,312.08');
    });

    it("Refresh the Quote", async function () {
        await util.browser.refresh();
        await util.browser.sleep(10000);
    });

    it("Switch to iframe", async function () {
        await util.browser.switchToIframe("iframe[id='__xmlview1--callidus_frame']");
    });

    it("Move up product", async function () {
        await cpqQuote.quote1.products.handleMovingUpProduct("8004685");
    });

    it("Click open link in formula validator", async function () {
        await cpqQuote.quote1.quote.clickOpenLinkInFormulaValidator();
    });

    it("Switch to frame", async function () {
        await util.browser.switchToIframe("#debuggerIframe");
    });

    it("Enter text in text area", async function () {
        const elem = nonUi5.element.getByXPath('//textarea[@id="txtFormula"]');
        await nonUi5.userInteraction.clearAndFill(elem, '<*CTX(Quote.CurrentItem.CustomField(SSP))*>');
        await util.browser.sleep(2000);
    });

    it("Click on parse string button", async function () {
        const elem = nonUi5.element.getByXPath('//input[@id="btnParseString"]');
        await nonUi5.userInteraction.click(elem);
    });

    it("Verify the Result: Net TCV value > IT2, so SSP = IT2", async function () {
        const elem = await nonUi5.element.getByXPath('//textarea[@id="txtResult"]');
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        expect(await elem.getText()).toEqual('295,511.63');
    });

    it("Refresh the Quote", async function () {
        await util.browser.refresh();
        await util.browser.sleep(10000);
    });

    it("Switch to iframe", async function () {
        await util.browser.switchToIframe("iframe[id='__xmlview1--callidus_frame']");
    });

    it("Update Net Price", async function () {
        await cpqQuote.quote1.quote.fillDiscountInCartTable("8004685", 1, "50.00");
        await util.browser.sleep(3000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
    });

    it("Click on reprice", async function () {
        await cpqQuote.quote1.quote.clickReprice();
    });

    it("Click open link in formula validator", async function () {
        await cpqQuote.quote1.quote.clickOpenLinkInFormulaValidator();
    });

    it("Switch to iframe", async function () {
        await util.browser.switchToIframe("#debuggerIframe");
    });

    it("Enter text in text area", async function () {
        const elem = nonUi5.element.getByXPath('//textarea[@id="txtFormula"]');
        await nonUi5.userInteraction.clearAndFill(elem, '<*CTX(Quote.CurrentItem.CustomField(SSP))*>');
        await util.browser.sleep(2000);
    });

    it("Click on parse string button", async function () {
        const elem = nonUi5.element.getByXPath('//input[@id="btnParseString"]');
        await nonUi5.userInteraction.click(elem);
    });

    it("Verify the Result: LEP < Net TCV value < IT2, so SSP = Net TCV", async function () {
        const elem = await nonUi5.element.getByXPath('//textarea[@id="txtResult"]');
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        expect(await elem.getText()).toEqual('171,328.44');
    });
});
