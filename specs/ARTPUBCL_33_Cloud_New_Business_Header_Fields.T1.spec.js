describe("ARTPUBCL_33_Cloud_New_Business_Header_Fields", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('new_business_header_fields');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 


    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name: ARTPUBCL_33_Cloud_New_Business_Header_Fields
     Step0: Load the Base Quote
     Step0: Switch to iFrame callidus_frame
     Step0: Wait for Quote to be loaded
     Step0: Wait for Quote to be loaded Fluent Wait
     ******************************
     **** Copy the Base Quote *****
     ******************************
     Wait for copied Quote
     Add Product: 8000347
     Wait for Quote to be loaded
     Verify for the product '8000347' in the Cart
     Click on Reprice
     Verification of Anniversary date
     Assert 'Deal Structure Options' as 'Standard
     Click on 'Terms and Conditions'
     Assert 'Application SLA %' as '99.7
     Assert 'Platform SLA %' as '99.90'
     Assert 'Service Credit % as '2'
     Assert 'Renewal Duration' as '36
     Assert 'Renewal Type'as Automated
     Assert 'Increase Type' as 'Flat Per Annum'
     Assert 'Increase %' as '3.3%'
     Assert 'Billing Interval as 'Yearly (According to Contract Start Date)'
     Assert 'Billing Schedule as 'Invoicing in Advance'
     Assert 'External Financing Costs' as '0'
     ********************************************************************************************************/
    const sCloudProduct = "8000347";

    //********************************* Load the Base Quote ************************************
    
    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("206087000002");
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("Wait for copied Quote", async function () {
        await cpqQuote.quote1.quote.handleWaitForCopiedQuote();
    });

    //******************************************************************************************
    
    it("Add Product: 8000347", async function () {
        await cpqQuote.quote1.products.clickAddProduct(sCloudProduct);
    });

    it("Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("Verify for the product '8000347' in the Cart", async function () {
        let prod = await nonUi5.element.getByXPath(".//*[text()='" + sCloudProduct + "']");
        browser.executeScript("arguments[0].scrollIntoView({block: \"center\"});", prod);
    });

    it("Reprice", async function () {
        await cpqQuote.quote1.quote.clickReprice();
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
    });
    
    it("Verification of Anniversary date", async function () {
        compareValue = "01/18/28";
        var elem = await nonUi5.element.getByXPath('//*[@id="terms-and-conditions-section"]/div/div[2]/div/div[2]/div[1]/div/div[7]/div/div[2]/div');
        elemVal = await nonUi5.element.getValue(elem);
        console.log(elemVal);
        await nonUi5.assertion.expectAttributeToBe(elem, compareValue);
    }, 101000);

    it("Assert 'Deal Structure Options' as 'Standard'", async function(){
        let elem = await nonUi5.element.getByXPath("//*[@id='terms-and-conditions-section']//div[label[text()='Deal Structure Options']]/following-sibling::div/select/option[1]");
		elem.getAttribute("selected").then(function (text) {
			expect(text).toEqual("true");
			});
		await nonUi5.assertion.expectValueToBe(elem, "Standard");
    }, 31000);

    it("Click On 'Terms and Conditions'", async function () {
        await cpqQuote.quote1.termsConditionsTab.navigateToTermsConditionsTab();
		await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
    });

    it("Assert 'Application SLA %' as '99.7'", async function(){
        let elem = await nonUi5.element.getByXPath('//*[@id="terms-and-conditions-section"]//div[label[text()="Application SLA %"]]/following-sibling::div');
        await nonUi5.assertion.expectValueToBe(elem, "99.7");
    });

    it("Assert 'Platform SLA %' as '99.90'", async function(){
        let elem = await nonUi5.element.getByXPath('//*[@id="terms-and-conditions-section"]//div[label[text()="Platform SLA %"]]/following-sibling::div');
        await nonUi5.assertion.expectValueToBe(elem, "99.90");
    });

    it("Assert 'Service Credit % as '2'", async function(){
        let elem = await nonUi5.element.getByXPath('//*[@id="terms-and-conditions-section"]//div[label[text()="Service Credit %"]]/following-sibling::div/select/optgroup[1]/option[1]');
		elem.getAttribute("selected").then(function (text) {
			expect(text).toEqual("true");
			});
		await nonUi5.assertion.expectValueToBe(elem, "2");
    }, 31000);

    it("Assert 'Renewal Duration' as '36'", async function () {
        let elem = await nonUi5.element.getByXPath('//*[@id="terms-and-conditions-section"]//div[label[text()="Renewal Duration (months)"]]/following-sibling::div/input')
        elem.getAttribute("selected").then(function (text) {
			expect(text).toEqual("true");
			});
		await nonUi5.assertion.expectValueToBe(elem, "36");
    }, 31000);

    it("Assert 'Renewal Type'as Automated", async function(){
        let elem = await nonUi5.element.getByXPath('//*[@id="terms-and-conditions-section"]//div[label[text()="Renewal Type"]]/following-sibling::div/select/optgroup[1]/option[1]');
		elem.getAttribute("selected").then(function (text) {
			expect(text).toEqual("true");
			});
		await nonUi5.assertion.expectValueToBe(elem, "Automated");
    }, 31000);

    it("Assert 'Increase Type' as 'Flat Per Annum'", async function () {
        let elem = await nonUi5.element.getByXPath("//*[@id='terms-and-conditions-section']//div[label[text()='Increase Type']]/following-sibling::div/select/optgroup[1]/option[1]");
		elem.getAttribute("selected").then(function (text) {
			expect(text).toEqual("true");
			});
		await nonUi5.assertion.expectValueToBe(elem, "Flat Per Annum");
    }, 31000);
    
    it("Assert 'Increase %' as '3.3%'", async function () {
        var elem = await nonUi5.element.getByXPath("//*[@id='terms-and-conditions-section']//div[label[text()='Increase %']]/following-sibling::div/input");
        await nonUi5.assertion.expectValueToBe(elem, "3.3%");
    }, 31000);

    it("Assert 'Billing Interval as 'Yearly (According to Contract Start Date)'", async function(){
        let elem = await nonUi5.element.getByXPath("//*[@id='terms-and-conditions-section']//div[label[text()='Billing Interval']]/following-sibling::div/select/optgroup[1]/option[1]");
		elem.getAttribute("selected").then(function (text) {
			expect(text).toEqual("true");
			});
		await nonUi5.assertion.expectValueToBe(elem, "Yearly (According to Contract Start Date)");
    }, 31000);

    it("Assert 'Billing Schedule as 'Invoicing in Advance'", async function(){
        let elem = await nonUi5.element.getByXPath("//*[@id='terms-and-conditions-section']//div[label[text()='Billing Schedule']]/following-sibling::div/select/optgroup[1]/option[1]");
		elem.getAttribute("selected").then(function (text) {
			expect(text).toEqual("true");
			});
		await nonUi5.assertion.expectValueToBe(elem, "Invoicing in Advance");
    }, 31000);
    
    it("Assert 'External Financing Costs' as '0'", async function(){
        var elem = await nonUi5.element.getByXPath("//*[@id='terms-and-conditions-section']//div[label[text()='External Financing Costs']]/following-sibling::div/div");
        await nonUi5.assertion.expectValueToBe(elem, "0");
    }, 31000);
   
});
