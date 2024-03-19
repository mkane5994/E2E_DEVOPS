const { cp } = require("fs");

describe("Premium Engagment Performance test", function () {
    
    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('pe_performance');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ////////

    const currency = "€";
    const los = "PE";
    const billingType = "FPP";
    let startDate, endDate, totSubVal = 0, totVal = 0, totDays = 0, margin, totString;
    let productQtyPrice = {'Lead TQM':['12',''],
                            'TQM Contingent':['19',''],
                            'Enterprise Architect':['13',''],
                            'Support Service Days Contingent':['15',''],
                            'SAP Expertise on Demand Contingent':['14',''],
                            'On Call Duties (Slots)':['17','']};
    const standReadyProduct = ['AIM Basic', 'SAP Service Level Agreement', 'SAP Premium Service Level Agreement', 'SAP Secure Support (basic)'];

    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name: Premium Engagment Performance test
     Step 0: Login to CPQ
     Step 1: Load the Quote
     Step 2: Copy Quote
     Step 3: User add Premium Engagement
     Step 4: Fill Start Date
     Step 5: Fill End Date
     Step 6: Store start and end date
     Step 7: Select 'Custom' option for 'Breakdown by contract or calendar year?'
     Step 8: Enter '10' in 'Enter Number of Premium Engagement Periods'
     Step 9: Select 'MaxAttention' as PE Product
     Step 10: Select 'PSLE' as Customer Support Option
     Step 11: Navigate to Region 1 Deliv. tab
     Step 12: Enter values for TQM Contingent field from productQtyPrice dict
     Step 13: Navigate to 'Stand Ready Obligations' tab
     Step 14: 01:Select 'SAP Premium Service Level Agreement' in SAP Premium Service Level Agreement
     Step 15: 01:Enter '45' in Enter number of Systems
     Step 16: 02:Select 'SAP Premium Service Level Agreement' in SAP Premium Service Level Agreement
     Step 17: 02:Enter '45' in Enter number of Systems
     Step 18: Select option Basic in Accelerated inc as basic
     Step 19: Select option 30 in Number of AIM Systems
     Step 20: Select option Basic in Secure Support Services Package
     Step 21: Enter 14 in Secure Support Services Productive Systems
     Step 22: Navigate to 'PSFIS' tab
     Step 23: Navigate to Deliverables List
     Step 24: Fill Periods and SLA/SLA Premium
     Step 25: Fill Periods AIM and Secure Support rows
     Step 26: Click on 'Create deliverables list'
     Step 27: Check currency and value isn't 0 for Lead TQM store price
     Step 28: Check the sum of components with Quota POB Subtotal
     Step 29: Check the sum of components with Total per Period
     Step 30: Assertion on Complete PE configuration
     Step 31: Step10: Click on 'Save' to return to quote
     Step 32: Assert data in section 'Transaction'
     Step 33: Assert Termination for Convenience table'
     Step 34: Assert data in table 'Billing Plan'
     Step 35: Click on expand all items
     Step 36: Assert PE partnumber 9505320
     Step 37: Check main item data
     Step 38: Assert Pricing Summary labels and columns'
     Step 39: Assert Pricing Summary table values'

    Checks proccess of configuring and adding Premium Engagment, asserting data on quote after product has been added
    Test data:
    |Delivery Item||Value to enter in "Period 1" column|
    |Lead TQM|12|
    |TQM Contingent|23|
    |Enterprise Architect|34|
    |Support Service Days Contingent|45|
    |SAP Expertise on Demand Contingent|56|
    |On Call Duties (Slots)|67|
     ********************************************************************************************************/
    
    //**************************************************************************************************************************
    //**************************************************************************************************************************
    //**************************************************** Start Test **********************************************************
    //**************************************************************************************************************************
    //**************************************************************************************************************************
    //********************************* Load a Quote ***************************************************************************
    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("269234000007");
    });

    it("Copy Quote", async function () {
        await util.browser.sleep(5000);
        await cpqQuote.quote1.quote.clickCopyQuote();
    });
    
    //********************************* Add Premium Engagement service to Cart ************************************************

    it("User add Premium Engagement", async function () {
        await cpqQuote.quote1.products.clickAddConfigureProduct("Premium Engagement");
        await util.browser.sleep(2000);
    });

    //**** Enter Start Date 4 months later than the test execution date and End Date 3 years later than Start Date *************

    it("Fill Start Date", async function () {
        await cpqQuote.quote1.products.fillDateConfigurator('1376', 4);
        await util.browser.sleep(2000);
    });

    it("Fill End Date", async function () {
        await cpqQuote.quote1.products.fillDateConfigurator('1377', 40);
        await util.browser.sleep(2000);
    });

    it("Store start and end date", async function () {
        let elem = await nonUi5.element.getByXPath('//*[@id="1376"]');
        startDate = await nonUi5.element.getAttributeValue(elem, "value");
        elem = await nonUi5.element.getByXPath('//*[@id="1377"]');
        endDate = await nonUi5.element.getAttributeValue(elem, "value");
        console.log(startDate , endDate);
    });

    //************************************* Configure PE product in CONTRACT DEFINITION tab ****************************************

    it("Select 'Custom' option for 'Breakdown by contract or calendar year?'", async function () {
        await cpqQuote.quote1.products.selectDateBreakdown(4);
    });

    it("Enter '10' in 'Enter Number of Premium Engagement Periods'", async function () {
        await util.browser.sleep(10000);
        let elem = await nonUi5.element.getByXPath('//*[@id="1613"]');
        await nonUi5.userInteraction.clearAndFill(elem, "10");
    });

    it("Select 'MaxAttention' as PE Product", async function () {
        await cpqQuote.quote1.products.selectPEProduct("SAP MaxAttention (Evolved)");
    });

    it("Select 'PSLE' as Customer Support Option", async function () {
        await util.browser.sleep(10000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await cpqQuote.quote1.products.selectPESupport("PSLE");
    });

//     //************************************* Enter values for product in REGION 1 DELIV tab ****************************************

    it("Navigate to Region 1 Deliv. tab", async function () {
        await cpqQuote.quote1.products.selectCfgTab("Region 1 Deliv.");
    });

    it("Enter values for TQM Contingent field from productQtyPrice dict", async function () {
        for( j = 1; j <= 10; j++){
            for(i = 0; i<Object.keys(productQtyPrice).length; i++){
                await cpqQuote.quote1.products.fillPEDeliverableDays(Object.keys(productQtyPrice)[i], j, productQtyPrice[Object.keys(productQtyPrice)[i]][0]);
                totDays += parseFloat(productQtyPrice[Object.keys(productQtyPrice)[i]][0]);
                await util.browser.sleep(6000);
            }
        }
        console.log(totDays);
    });


//     //************************************* Navigate to other tabs ****************************************

    it("Navigate to 'Stand Ready Obligations' tab", async function () {
        await cpqQuote.quote1.products.selectCfgTab("Stand Ready Obligations");
    });

    it("01:Select 'SAP Premium Service Level Agreement' in SAP Premium Service Level Agreement", async function () {
        await cpqQuote.quote1.products.selectSLAPackageOne("SAP Premium Service Level Agreement");
        await util.browser.sleep(4000);
    });
    

    it("01:Enter '45' in Enter number of Systems", async function () {
        await cpqQuote.quote1.products.enterSLANumberOfSystems("45");
        await util.browser.sleep(4000);
        await util.browser.resetFocus();
    });

    //sla2

    it("02:Select 'SAP Premium Service Level Agreement' in SAP Premium Service Level Agreement", async function () {
        await cpqQuote.quote1.products.selectSLAPackageOne("SAP Service Level Agreement",2);
        await util.browser.sleep(4000);
    });    

    it("02:Enter '45' in Enter number of Systems", async function () {
        await cpqQuote.quote1.products.enterSLANumberOfSystems("82", 2);
        await util.browser.sleep(4000);
    });

    it("Select option Basic in Accelerated inc as basic", async function (){
        const elem = await nonUi5.element.getByXPath('//*[@id="dropDown_2856"]');
        await nonUi5.userInteraction.click(elem);
        await util.browser.sleep(4000);
        const opt = await nonUi5.element.getByXPath('//*[@id="dropDown_2856"]/option[text()="Basic"]');
        await nonUi5.userInteraction.click(opt);
        await util.browser.sleep(4000);
    });

    it("Select option 30 in Number of AIM Systems", async function (){
        const elem = await nonUi5.element.getByXPath('//*[@id="dropDown_2855"]');
        await nonUi5.userInteraction.click(elem);
        await util.browser.sleep(4000);
        const opt = await nonUi5.element.getByXPath('//*[@id="dropDown_2855"]/option[text()="30"]');
        await nonUi5.userInteraction.click(opt);
        await util.browser.sleep(4000);
    });

    it("Select option Basic in Secure Support Services Package", async function (){
        const elem = await nonUi5.element.getByXPath('//*[@id="dropDown_1386"]');
        await nonUi5.userInteraction.click(elem);
        await util.browser.sleep(4000);
        const opt = await nonUi5.element.getByXPath('//*[@id="dropDown_1386"]/option[text()="Basic"]');
        await nonUi5.userInteraction.click(opt);
        await util.browser.sleep(4000);
    });

    it("Enter 14 in Secure Support Services Productive Systems", async function (){
        const elem = await nonUi5.element.getByXPath('//*[@id="1387"]');
        await nonUi5.userInteraction.click(elem);
        await util.browser.sleep(4000);
        await nonUi5.userInteraction.click(elem);
        await common.userInteraction.clearAndFillActive('14');
        await common.userInteraction.pressEnter();
        await util.browser.sleep(4000);
    });

    it("Navigate to 'PSFIS' tab", async function () {
        await util.browser.sleep(5000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await cpqQuote.quote1.products.selectCfgTab("PSfIS");
    });

    it("Navigate to Deliverables List", async function () {
        await cpqQuote.quote1.products.selectCfgTab("Deliverables List");
    });

    it("Fill Periods and SLA/SLA Premium", async function () {
        const dateArray = new Array(2); // Two rows
        dateArray[0] = [];
        dateArray[1] = [];
      
        let currentStartDate = new Date(startDate);
        let currentEndDate = new Date(startDate);
      
        for (let i = 1; i <= 10; i++) {
          currentEndDate.setMonth(currentEndDate.getMonth() + 3);
          dateArray[0].push(new Date(currentStartDate));
          dateArray[1].push(new Date(currentEndDate));
      
          // Add 1 day to the current end date to set it as the next start date
          currentEndDate.setDate(currentEndDate.getDate() + 1);
          currentStartDate = new Date(currentEndDate);
        }
        for (let j = 2; j < 12; j++){
            for (let i = 0; i < 6; i++) {
                if ( j === 4){
                    if (i % 2 === 0){
                    let elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 1}_${i}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[0][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 1}_${i + 1}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[1][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    }
                }else if(j === 5){
                    if (i % 2 === 0){
                    let elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 7}_${i}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[0][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 7}_${i + 1}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[1][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    }
                }else{
                    if (i % 2 === 0){
                    let elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j}_${i}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[0][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);

                    elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j}_${i + 1}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[1][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    }
                }
            }
        }
    });

    it("Fill Periods AIM and Secure Support rows", async function () {
        const dateArray = new Array(2); // Two rows
        dateArray[0] = [];
        dateArray[1] = [];
      
        let currentStartDate = new Date(startDate);
        let currentEndDate = new Date(startDate);
      
        for (let i = 1; i <= 10; i++) {
          currentEndDate.setMonth(currentEndDate.getMonth() + 3);
          dateArray[0].push(new Date(currentStartDate));
          dateArray[1].push(new Date(currentEndDate));
      
          // Add 1 day to the current end date to set it as the next start date
          currentEndDate.setDate(currentEndDate.getDate() + 1);
          currentStartDate = new Date(currentEndDate);
        }
        for (let j = 2; j < 12; j++){
            for (let i = 6; i < 10; i++) {
                if ( j === 4){
                    if (i % 2 === 0){
                    let elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 1}_${i}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[0][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);

                    elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 1}_${i + 1}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[1][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    }
                }else if(j === 5){
                    if (i % 2 === 0){
                    let elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 7}_${i}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[0][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);

                    elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j + 7}_${i + 1}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[1][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    }
                }else{
                    if (i % 2 === 0){
                    let elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j}_${i}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[0][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);

                    elem = await nonUi5.element.getByXPath(`//*[@id="3549_${j}_${i + 1}"]`);
                    await nonUi5.userInteraction.clearAndFill(elem, "");
                    await util.browser.sleep(1000);
                    await common.userInteraction.pressKey((dateArray[1][j-2].toLocaleDateString("en-US", {year: "2-digit",month: "2-digit",day: "2-digit"})).split(""));
                    await util.browser.resetFocus();
                    await util.browser.sleep(6000);
                    }
                }
            }
        }
    });


     //************************************* Deliverables List tab ****************************************

    it("Click on 'Create deliverables list'", async function () {
        await cpqQuote.quote1.products.clickCreateDeliverables();
        await util.browser.sleep(40000);
    });

    it("Check currency and value isn't 0 for Lead TQM store price", async function () {
        await util.browser.sleep(30000);
        let price = 0;
        for(i = 0; i<Object.keys(productQtyPrice).length; i++){
            price = await cpqQuote.quote1.products.peGetPriceFromSummaryView(Object.keys(productQtyPrice)[i], 1, currency);
            productQtyPrice[Object.keys(productQtyPrice)[i]][1] = price;
            totSubVal += price;
        }

        for(i = 0; i<standReadyProduct.length; i++){
            price = await cpqQuote.quote1.products.peGetPriceFromSummaryView(standReadyProduct[i], 1, currency);
            totVal += price;
        }
        totVal = (totSubVal + totVal) * 10;
    });

    it("Check the sum of components with Quota POB Subtotal", async function () {
        let tot = 0;
        tot = await cpqQuote.quote1.products.peGetPriceFromSummaryView('Quota POB Subtotal', 1, currency);
        await common.assertion.expectEqual(tot,totSubVal);
    });

    it("Check the sum of components with Total per Period", async function () {
        let tot = 0, totalPeriod = 0;
        totalPeriod = totVal / 10;
        tot = await cpqQuote.quote1.products.peGetPriceFromSummaryView("Total per Period", 1, currency);
        await common.assertion.expectEqual(tot,totalPeriod);
        totString = totVal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
    });

   it("Assertion on Complete PE configuration", async function () {
        await util.browser.sleep(5000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await cpqQuote.quote1.products.expectStatusComplete();
    });

    it("Click on 'Save' to return to quote", async function () {
        await cpqQuote.quote1.products.clickUpdateQuote();
        await util.browser.sleep(120000);
    });

    it("Assert data in section 'Transaction'", async function () {
        await cpqQuote.quote1.quote.handleAssertTransactionFields("none", "none", "none", "none", "none", "00.00%");
    });

    it("Assert Termination for Convenience table'", async function () {
        await cpqQuote.quote1.quote.handleAssertT4CTable('2','0.00','0');
    });

    it("Assert data in table 'Billing Plan'", async function () {
        await cpqQuote.quote1.quote.handleAssertBillingPlan(1, los, "Annually", currency, totString, startDate, endDate, "Yes", "ZC02");
    });

    it("Click on expand all items", async function () {
        await util.browser.sleep(10000);
        await cpqQuote.quote1.products.clickExpandAllItems();
    });

    it("Assert PE partnumber 9505320", async function () {
        let elem;
        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr/td[4]/div/div[3]/div[1]/a[1]/span'); // PE partnumber
        await nonUi5.assertion.expectAttributeToBe(elem, "9505320");

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr/td[18]/div/div/span[2]');
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        margin = await cpqQuote.quote1.products.priceToNumber(elem, false);

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[2]/td[4]/div/div[3]/div[1]/a[1]/span'); // PE child partnumber
        await nonUi5.assertion.expectAttributeToBe(elem, "9504380");

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[3]/td[4]/div/div[3]/div[1]/a[1]/span');
        await nonUi5.assertion.expectAttributeToBe(elem, "9504662");

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[4]/td[4]/div/div[3]/div[1]/a[1]/span');
        await nonUi5.assertion.expectAttributeToBe(elem, "9500163");

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[5]/td[4]/div/div[3]/div[1]/a[1]/span');
        await nonUi5.assertion.expectAttributeToBe(elem, "9504903");

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[6]/td[4]/div/div[3]/div[1]/a[1]/span');
        await nonUi5.assertion.expectAttributeToBe(elem, "9500162");

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[7]/td[4]/div/div[3]/div[1]/a[1]/span'); 
        await nonUi5.assertion.expectAttributeToBe(elem, "9503595");

        elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[8]/td[4]/div/div[3]/div[1]/a[1]/span'); 
        await nonUi5.assertion.expectAttributeToBe(elem, "9500570");
        await util.browser.sleep(4000);
    });

    it("Check main item data", async function () {
            let elem = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[5]/div/span[2]`); // Start Date
            await nonUi5.assertion.expectAttributeToBe(elem, startDate);
            elem = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[6]/div/span[2]`); // End Date
            await nonUi5.assertion.expectAttributeToBe(elem, endDate);
    });

    it("Assert Pricing Summary labels and columns'", async function () {
        await cpqQuote.quote1.quote.handleAssertPricingSummaryColumnsVisible("PE Service");
    });

    it("Assert Pricing Summary table values'", async function () {
        totDays = (totDays.toString() + ".0");
        const marginSource = "data:image/gif;base64,R0lGODlhEAAQAPeQAObm5uLi4vr6+kvTXNra69XV1b29vT/HUN7e3hHQItDQ0BHEIr6+vlWsXcvLy8HBwc3NzampqRG4IrS0tJzQohCEE6Ojp8fHx2rFdS+sOxGlGqysrFria/Hx8VG+Xurq6uTk5EyeUp6enoqKioi2ka+vr8TExDykRTa+R42Nj/f39/Dw8DecPvz8/BHUIuzs7LKyvbKysv39/X19fdbW1uvr6/X19dLS0tPT07y8vMbGxju8S9zc2yyoN066WtjY2Fy1ZY7BkkrRWs/y07e3ub+/vz7ETRGsIszMy8rKyh2sLc/P2sDAwEfOVxG3ItbW5M/P0BGyIiWvNhWyJoa3jMnJ0Bq4J5DDlBiwKbi4uF21aKXNqjG5QiGuLSO1MyqzOsHBw6enqlTcZVXdZjnASeTk4xHFHxKjI6OjpODg373YwESwUcPDw8zMzErSW6PorEHJUhGmH93e3c/Pzxa3IxG2IqDOptra2q6usRqrJ0bOV0XMVROqJELKU9bW43/Ch9HR2xO2JNnZ2aSkpM7O1BGiIhe1Jx2rLlPbZN/f34S2i7a2tkS4Uaioq8LCwv///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJAALAAAAAAQABAAAAj/ACEJhNSBhg4DBnTQ6DBwoIACBm58AADggwIDBQQ4dOAIAAUMO3ZgoFDmgQONkHA8SOShzxgOHMTA8cCDAQ5IK7Kk8SEE0YCfAx7p8fFj0QoFSa4YcXOg6YEhjx6RCVJEQQ4eQJqgQMFFyhYEAbR8AYIkR4k5GfY8OnRmDdg/hZRkYFNiQ5seb24UYCQngB0+R7D0YLJhApQGXgrcAasmigQJhhqAmXCBCJUuU8ACcLKgcx5FeC7UGETohJVAAOokWE3nRBU0NSCZaASIhYY4LlyY0cBiSRgTAlXEsPCERIgKFUKQ8GMhhgpIMmyAiJACBoHrBGCkiADChowWLwRBD2AgYsSMGSNEMIDw40WLgAA7";
        await cpqQuote.quote1.quote.handleAssertPricingSummary(totString, "0.0", totDays ,margin, marginSource, marginSource, billingType);
    });
});