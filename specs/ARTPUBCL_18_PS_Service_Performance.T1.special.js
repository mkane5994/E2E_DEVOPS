describe("PS Bundle - Online Config Performance test", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('ps_service_performance');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 

    /**************************************************************************************************************************
    **************************************************** START WITH TEST **********************************************************
    **************************************************************************************************************************
    Test Name: PS Bundle - Online Config Performance test
     Step 0: Login to CPQ
     Step 1: Load the Quote
     Step 2: Copy Quote
     Step 3: User add PS Bundle - Online Config
     Step 4: Fill Start Date
     Step 5: Fill End Date
     Step 6: Fill Service Phases Table
     Step 7: Add add child products 50119731, 50121300, 50119729, 50116689, 50132032
     Step 8: Go to TIMELINE DISTRIBUTION tab
     Step 9: Fill table 'Service Role Details'
     Step 10: Go to CONTRACT ITEMS REVIEW tab
     Step 11: Assert Start Date and End Date
     Step 12: Assert data in first row in table 'Contract Items'
     Step 13: Assert data in second row in table 'Contract Items'
     Step 14: Save the changes on PS Bundle
     Step 15: Assert data in section 'Transaction'
     Step 16: Assert data in first row in table 'Billing Plan'
     Step 17: Assert data in second row in table 'Billing Plan'
     Step 18: Assert data in table 'Customer Daily Rates'
     Step 19: Fill data in table 'Milestones'
     Step 20: PS Bundle in cart
     Step 21: Check item data
     Step 22: Assert columns in table 'Pricing Summary'
     Step 23: Assert data in table 'Pricing Summary'
     ********************************************************************************************************/
    //**************************************************************************************************************************
    //********************************* Load Quote with Quote In Progress status ***********************************************
    //**************************************************************************************************************************
    //********************************  Checks proccess of configuring and adding PS Bundle - Online Configuration *************
    //**************************************************************************************************************************

    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote('269234000011');
    });

    it("Copy Quote", async function () {
        await util.browser.sleep(5000);
        await cpqQuote.quote1.quote.clickCopyQuote();
    });
    
    it("User add PS Bundle - Online Config", async function () {
        await cpqQuote.quote1.products.clickAddConfigureProduct("PS Bundle - Online Config");
    });

    it("Fill Start Date", async function () {
        await cpqQuote.quote1.products.fillDateConfigurator('1376', 2);
        await util.browser.sleep(1000);
        let elem = await nonUi5.element.getById('1376');
        startDate = await nonUi5.element.getAttributeValue(elem, "value");
        await util.browser.sleep(5000);
    });

    it("Fill End Date", async function () {
        await cpqQuote.quote1.products.fillDateConfigurator('1377', 36);
        await util.browser.sleep(5000);
        let elem = await nonUi5.element.getById('1377');
        endDate = await nonUi5.element.getAttributeValue(elem, "value");
    });

    it("Fill Service Phases Table", async function () {
        for (let i = 0; i < 9; i++) {
            let elem = await nonUi5.element.getByXPath('//*[@id="addRowBtn_1618"]');
            await util.browser.sleep(10000);
            await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
            await nonUi5.userInteraction.click(elem);
        }
        endDateRowString = ""
        startDateRowString = ""
        for (let i = 0; i < 10; i++) {
            let elem = await nonUi5.element.getByXPath(`//*[@id="3642_2_${i}"]`);
            await nonUi5.userInteraction.clickAndRetry(elem);
            await util.browser.sleep(1000);
            await nonUi5.userInteraction.clear(elem);
            let phaseString = `Phase ${i+1}`;
            let phaseArray = phaseString.split("");
            await common.userInteraction.pressKey(phaseArray);
            if (i === 0) {
                let elem1 = await nonUi5.element.getByXPath(`//*[@id="3642_3_${i}"]`);
                await nonUi5.userInteraction.clickAndRetry(elem1);
                await util.browser.sleep(1000);
                await nonUi5.userInteraction.clearAndFill(elem1, "");
                let startDateArray = startDate.split("");
                await common.userInteraction.pressKey(startDateArray);
                let endDateRow = new Date(startDate);
                endDateRow.setMonth(endDateRow.getMonth()+3);
                let year = endDateRow.getFullYear();
                let month = endDateRow.getMonth() + 1;
                let days = endDateRow.getDate();
                endDateRowString = String(month) + "/" + String(days) + "/" + String(year).substring(2);
                let elem2 = await nonUi5.element.getByXPath(`//*[@id="3642_4_${i}"]`);
                await nonUi5.userInteraction.clearAndFill(elem2, "");
                await util.browser.sleep(1000);
                await common.userInteraction.pressKey(["Backspace","Backspace","Backspace","Backspace","Backspace","Backspace","Backspace","Backspace"]);
                let endDateArray = endDateRowString.split("");
                await common.userInteraction.pressKey(endDateArray);
            } else if (i === 9) {
                let startDateRow = new Date(endDateRowString);
                startDateRow.setDate(startDateRow.getDate() + 1);
                let year = startDateRow.getFullYear();
                let month = startDateRow.getMonth() + 1;
                let days = startDateRow.getDate();
                startDateRowString = String(month) + "/" + String(days) + "/" + String(year).substring(2);
                let elem1 = await nonUi5.element.getByXPath(`//*[@id="3642_3_${i}"]`);
                await nonUi5.userInteraction.clickAndRetry(elem1);
                await util.browser.sleep(1000);
                let startDateArray = startDateRowString.split("");
                await common.userInteraction.pressKey(startDateArray);
                let elem2 = await nonUi5.element.getByXPath(`//*[@id="3642_4_${i}"]`);
                await nonUi5.userInteraction.clearAndFill(elem2, "");
                await util.browser.sleep(1000);
                let endDateArray = endDate.split("");
                await common.userInteraction.pressKey(endDateArray);
            } else {
                let startDateRow = await new Date(endDateRowString);
                startDateRow.setDate(startDateRow.getDate() + 1);
                let year = startDateRow.getFullYear();
                let month = startDateRow.getMonth() + 1;
                let days = startDateRow.getDate();
                startDateRowString = String(month) + "/" + String(days) + "/" + String(year).substring(2);
                let elem1 = await nonUi5.element.getByXPath(`//*[@id="3642_3_${i}"]`);
                await nonUi5.userInteraction.clickAndRetry(elem1);
                await util.browser.sleep(1000);
                let startDateArray = startDateRowString.split("");
                await common.userInteraction.pressKey(startDateArray);
                let endDateRow = new Date(startDateRowString);
                endDateRow.setMonth(endDateRow.getMonth() + 3);
                let year2 = endDateRow.getFullYear();
                let month2 = endDateRow.getMonth() + 1;
                let days2 = endDateRow.getDate();
                endDateRowString = String(month2) + "/" + String(days2) + "/" + String(year2).substring(2);
                await util.browser.sleep(1000);
                let elem2 = await nonUi5.element.getByXPath(`//*[@id="3642_4_${i}"]`);
                await nonUi5.userInteraction.clearAndFill(elem2, "");
                await util.browser.sleep(3000);
                let endDateArray = endDateRowString.split("");
                await common.userInteraction.pressKey(endDateArray);
            }
        }
    });

    it("Add add child products 50119731, 50124566, 50119729, 50116689, 50119744", async function () {
        const productArray = ["50119731", "50124566", "50119729", "50116689", "50119744"];
        let elem = await nonUi5.element.getById('tab-12');
        await nonUi5.userInteraction.click(elem);
        for (let i = 0; i < productArray.length; i++) {
            await util.browser.sleep(10000);
            await cpqQuote.quote1.products.clickAddChildPSBundle(productArray[i]);
            await util.browser.sleep(10000);
            let elem = await nonUi5.element.getByXPath(`//*[@id="no-more-tables"]/table/tbody/tr[${i+1}]/td[4]/a/div/span[2]`);
            await nonUi5.userInteraction.click(elem);
            await cpqQuote.quote1.products.clickAddServiceRolePSBundle();
            await cpqQuote.quote1.products.selectQtyDaysPSBundle('50');
            let elem1 = await nonUi5.element.getByXPath("//*[@id='3101_14_0']/option[12]");
            await nonUi5.userInteraction.click(elem1);
            await util.browser.sleep(5000);
            let elem2 = await nonUi5.element.getByXPath("//*[@id='actionsContainer']/div[1]/div[1]/div[2]/div[1]/button[3]");
            await nonUi5.userInteraction.click(elem2);
            await util.browser.sleep(5000);
        }
    });


    it("Go to TIMELINE DISTRIBUTION tab", async function () {
        let elem = await nonUi5.element.getByXPath("//*[@id='tab-83']");
        await nonUi5.userInteraction.click(elem);
    });

    it("Fill table 'Service Role Details'", async function () {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 10; j++) {
                if (j + 2 === 4){
                    elem = await nonUi5.element.getByXPath(`//*[@id="3641_13_${i}"]`);
                } else {
                    elem = await nonUi5.element.getByXPath(`//*[@id="3641_${j+2}_${i}"]`);
                }
                await util.browser.sleep(3000);
                await nonUi5.userInteraction.click(elem);
                await util.browser.sleep(3000);
                await common.userInteraction.pressKey(["5", "Enter"]);
            }
        }
    });

    it("Go to CONTRACT ITEMS REVIEW tab", async function () {
        let elem = await nonUi5.element.getByXPath("//*[@id='tab-84']");
        await nonUi5.userInteraction.click(elem);
    });

    it("Assert Start Date and End Date", async function () {
        await util.browser.sleep(5000);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await nonUi5.element.waitToBeVisible('//*[@id="1420790"]/label', 60000); //Start Date
        let elem = await nonUi5.element.getByXPath('//*[@id="1420790"]/label'); //Start Date
        let startDateNew = new Date(startDate);
        let year = startDateNew.getFullYear();
        let month = startDateNew.getMonth() + 1;
        let days = startDateNew.getDate();
        convertedStartDate = String(month) + "/" + String(days) + "/" + String(year);
        await nonUi5.assertion.expectAttributeToBe(elem, "Start Date: " + convertedStartDate);
        let elem2 = await nonUi5.element.getByXPath('//*[@id="1420791"]/label'); //End Date
        let endDateNew = new Date(endDate);
        let year2 = endDateNew.getFullYear();
        let month2 = endDateNew.getMonth() + 1;
        let days2 = endDateNew.getDate();
        convertedEndDate = String(month2) + "/" + String(days2) + "/" + String(year2);
        await nonUi5.assertion.expectAttributeToBe(elem2, "End Date: " + convertedEndDate);
    });

    it("Assert data in first row in table 'Contract Items'", async function () {
        let rowNum = 1
        let contractItemWorkPackagesValue = "Ariba Application Mgmt Serv. [G],ERP Logistics [G],Enterprise Asset Management Service [G],SAP Billing On-Prem Services [G]";
        let billingTypeValue = "Time & Materials";
        let travelRebillOptionValue = "Cost Based";
        let specializedLoSValue = "PS Consulting";
        let shipToValue = "DE";
        let effortValue = "200";
        let currencyValue = "€";
        let riskReserveValue = "0.00";
        let minInlierDiscountPercentValue = "0.00";
        result = await cpqQuote.quote1.products.handleAssertContractItems(rowNum, contractItemWorkPackagesValue, billingTypeValue, travelRebillOptionValue, specializedLoSValue, shipToValue, effortValue, currencyValue, riskReserveValue, minInlierDiscountPercentValue);
        listPrice = result[0];
        SSPMidpoint = result[1];
        marginAtMinInlierDiscount = result[2];
    });

    it("Assert data in second row in table 'Contract Items'", async function () {
        let rowNum = 2
        let contractItemWorkPackagesValue = "Enablement Serv. for SAP Analytics Cloud";
        let billingTypeValue = "Fixed Price";
        let travelRebillOptionValue = "Cost Based";
        let specializedLoSValue = "PS Consulting";
        let shipToValue = "DE";
        let effortValue = "50";
        let currencyValue = "€";
        let riskReserveValue = "";
        let minInlierDiscountPercentValue = "0.00";
        result = await cpqQuote.quote1.products.handleAssertContractItems(rowNum, contractItemWorkPackagesValue, billingTypeValue, travelRebillOptionValue, specializedLoSValue, shipToValue, effortValue, currencyValue, riskReserveValue, minInlierDiscountPercentValue);
        listPrice2 = result[0];
        SSPMidpoint2 = result[1];
        marginAtMinInlierDiscount2 = result[2];
    });

    it("Save the changes on PS Bundle", async function () {
        let elem = await nonUi5.element.getByXPath("//*[@id='actionsContainer']/div[1]/div[1]/div[2]/div[1]/button[1]");
        await nonUi5.userInteraction.click(elem);
    });

    it("Assert data in section 'Transaction'", async function () {
        let ServiceContractIDValue = "none";
        let FrameworkIDValue = "none";
        let RateCardIDValue = "none";
        let WorkAtRiskDateValue = "none";
        let ROMApprovalDateValue = "none";
        let CrossBorderTaxRateValue = "00.00%";
        await nonUi5.element.waitToBeVisible(cpqQuote.quote1.quote.selectors.businessTypeCFNewContractOption, 120000);
        await cpqQuote.quote1.quote.handleAssertTransactionFields(ServiceContractIDValue, FrameworkIDValue, RateCardIDValue, WorkAtRiskDateValue, ROMApprovalDateValue, CrossBorderTaxRateValue);
    });

    it("Assert data in first row in table 'Billing Plan'", async function () {
        await util.browser.sleep(50000);
        let rowNum = 1
        let LoSOffering = "PS FPP";
        let billingCycle = "Milestone";
        let currency = "€";
        let inAdvance = "No";
        let paymentTerms = "ZC02";
        await await cpqQuote.quote1.quote.handleAssertBillingPlan(rowNum, LoSOffering, billingCycle, currency, listPrice2, startDate, endDate, inAdvance, paymentTerms);
    });

    it("Assert data in second row in table 'Billing Plan'", async function () {
        let rowNum = 2
        let LoSOffering = "PS T&M";
        let billingCycle = "Monthly";
        let currency = "€";
        let inAdvance = "No";
        let paymentTerms = "ZC02";
        await await cpqQuote.quote1.quote.handleAssertBillingPlan(rowNum, LoSOffering, billingCycle, currency, listPrice, startDate, endDate, inAdvance, paymentTerms);
    });

    it("Assert data in table 'Customer Daily Rates'", async function () {
        await cpqQuote.quote1.quote.handleAssertCustomerDailyRatesVisibility();    
    });

    it("Fill data in table 'Milestones'", async function () {
        let description = "test";
        let endPeriod = new Date(startDate);
        endPeriod.setMonth(endPeriod.getMonth()+3);
        let year = endPeriod .getFullYear();
        let month = endPeriod .getMonth();
        let days = endPeriod .getDate();
        let endPeriodString = String(month) + "/" + String(days) + "/" + String(year);
        let dateForInvoicing = new Date(startDate);
        dateForInvoicing.setMonth(dateForInvoicing.getMonth()+4);
        let year2 = dateForInvoicing.getFullYear();
        let month2 = dateForInvoicing.getMonth();
        let days2 = dateForInvoicing.getDate();
        let dateForInvoicingString = String(month2) + "/" + String(days2) + "/" + String(year2);
        let symbolsToDelete = 4;
        let invoicingValue = "500";
        await cpqQuote.quote1.quote.fillMilestones(description, startDate, endPeriodString, dateForInvoicingString, symbolsToDelete, invoicingValue);
    });

    it("PS Bundle in cart", async function () {
        let elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr/td[4]/div/div[3]/div[1]/a[1]/span');
        await nonUi5.assertion.expectAttributeToBe(elem, "Professional Services Bundle - Online Configuration");
    });

    it("Check item data", async function () {
        let expandItem = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[4]/div/div[2]/div/a`); //Expand PS Bundle
        await nonUi5.userInteraction.click(expandItem);
        let elem = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[5]/div/span[2]`);  //Start Date
        await nonUi5.assertion.expectAttributeToBe(elem, startDate);
        let elem1 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[6]/div/span[2]`);  //End Date
        await nonUi5.assertion.expectAttributeToBe(elem1, endDate);
        let elem2 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[10]/div/span[1]`);  //List Price currency
        await nonUi5.assertion.expectAttributeToBe(elem2, "€");
        let elem3 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[10]/div/span[2]`);  //List Price value
        let totalListPrice = parseFloat(listPrice.replace(",","")) + parseFloat(listPrice2.replace(",",""))
        await nonUi5.assertion.expectAttributeToBe(elem3, String((totalListPrice).toLocaleString('en-US', {minimumFractionDigits: 2})));
        let elem4 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[15]/div/span[2]`);  //Qty Days with Cont.
        await nonUi5.assertion.expectAttributeToBe(elem4, "250.00");
        let elem5 = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[1]/td[16]/div/span[2]'); //Total Revenue in Product
        totalRevenue = await nonUi5.element.getValue(elem5);
        let totalRevenueNumber = parseFloat(totalRevenue.replace(",",""));
        let elem6 = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[2]/td[16]/div/span[2]'); //Total Revenue in Product Child One
        let totalRevenueChildOne = await nonUi5.element.getValue(elem6);
        let totalRevenueChildOneNumber = parseFloat(totalRevenueChildOne.replace(",",""));
        let elem7 = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[3]/td[16]/div/span[2]'); //Total Revenue in Product Child Two
        let totalRevenueChildTwo = await nonUi5.element.getValue(elem7);
        let totalRevenueChildTwoNumber = parseFloat(totalRevenueChildTwo.replace(",",""));
        let elem8 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr/td[18]/div/div/span[2]`); //Total Margin %
        let elem8text = await elem8.getText();
        let elem8Rounded = await Number(Number(elem8text).toFixed(2));
        let onePercentOfTotalRevenue = totalRevenueNumber / 100;
        let totalRevenueWeightChildOne = totalRevenueChildOneNumber / onePercentOfTotalRevenue;
        let totalRevenueWeightChildTwo = totalRevenueChildTwoNumber / onePercentOfTotalRevenue;
        let marginAtMinInlierDiscountWeightChildOne = marginAtMinInlierDiscount * totalRevenueWeightChildOne / 100;
        let marginAtMinInlierDiscountWeightChildTwo = marginAtMinInlierDiscount2 * totalRevenueWeightChildTwo / 100;
        totalMargin = Number(marginAtMinInlierDiscountWeightChildOne + marginAtMinInlierDiscountWeightChildTwo).toFixed(2);
        totalMarginPlusOnePer = totalMargin * 1.01;
        totalMarginMinusOnePer = totalMargin * 0.99
        await common.assertion.expectTrue(totalMarginMinusOnePer < elem8Rounded && elem8Rounded < totalMarginPlusOnePer);
        let elem9 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[20]/div/span[1]`);  //SSP Midpoint currency
        await nonUi5.assertion.expectAttributeToBe(elem9, "€");
        let elem10 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[20]/div/span[2]`);  //SSP Midpoint value
        let SSPMidpointNumber = parseFloat(SSPMidpoint.replace(",",""));
        let SSPMidpointNumber2 = parseFloat(SSPMidpoint2.replace(",",""));
        await nonUi5.assertion.expectAttributeToBe(elem10, (SSPMidpointNumber + SSPMidpointNumber2).toLocaleString('en-US', {minimumFractionDigits: 2}));
        let elem11 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[19]/div/img`);  //Margin icon
        await nonUi5.assertion.expectAttributeToContain(elem11, "mt/SAP/images/highMarginNotEditablePicture.gif/", "src");
        let elem12 = await nonUi5.element.getByXPath(`//*[@id="itemsTable"]/tr[1]/td[22]/div/div[1]/img`);  //SSP icon
        await nonUi5.assertion.expectAttributeToBe(elem12, "data:image/gif;base64,R0lGODlhEAAQAPeQAObm5uLi4vr6+kvTXNra69XV1b29vT/HUN7e3hHQItDQ0BHEIr6+vlWsXcvLy8HBwc3NzampqRG4IrS0tJzQohCEE6Ojp8fHx2rFdS+sOxGlGqysrFria/Hx8VG+Xurq6uTk5EyeUp6enoqKioi2ka+vr8TExDykRTa+R42Nj/f39/Dw8DecPvz8/BHUIuzs7LKyvbKysv39/X19fdbW1uvr6/X19dLS0tPT07y8vMbGxju8S9zc2yyoN066WtjY2Fy1ZY7BkkrRWs/y07e3ub+/vz7ETRGsIszMy8rKyh2sLc/P2sDAwEfOVxG3ItbW5M/P0BGyIiWvNhWyJoa3jMnJ0Bq4J5DDlBiwKbi4uF21aKXNqjG5QiGuLSO1MyqzOsHBw6enqlTcZVXdZjnASeTk4xHFHxKjI6OjpODg373YwESwUcPDw8zMzErSW6PorEHJUhGmH93e3c/Pzxa3IxG2IqDOptra2q6usRqrJ0bOV0XMVROqJELKU9bW43/Ch9HR2xO2JNnZ2aSkpM7O1BGiIhe1Jx2rLlPbZN/f34S2i7a2tkS4Uaioq8LCwv///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJAALAAAAAAQABAAAAj/ACEJhNSBhg4DBnTQ6DBwoIACBm58AADggwIDBQQ4dOAIAAUMO3ZgoFDmgQONkHA8SOShzxgOHMTA8cCDAQ5IK7Kk8SEE0YCfAx7p8fFj0QoFSa4YcXOg6YEhjx6RCVJEQQ4eQJqgQMFFyhYEAbR8AYIkR4k5GfY8OnRmDdg/hZRkYFNiQ5seb24UYCQngB0+R7D0YLJhApQGXgrcAasmigQJhhqAmXCBCJUuU8ACcLKgcx5FeC7UGETohJVAAOokWE3nRBU0NSCZaASIhYY4LlyY0cBiSRgTAlXEsPCERIgKFUKQ8GMhhgpIMmyAiJACBoHrBGCkiADChowWLwRBD2AgYsSMGSNEMIDw40WLgAA7", "src");
    });

    it("Assert columns in table 'Pricing Summary'", async function () {
        await cpqQuote.quote1.quote.handleAssertPricingSummaryColumnsVisible('PS Service');
    });

    it("Assert data in table 'Pricing Summary'", async function () {
        let discountPercent = "0.0";
        let effort = "250.0";
        let marginSource = "data:image/gif;base64,R0lGODlhEAAQAPeQAObm5uLi4vr6+kvTXNra69XV1b29vT/HUN7e3hHQItDQ0BHEIr6+vlWsXcvLy8HBwc3NzampqRG4IrS0tJzQohCEE6Ojp8fHx2rFdS+sOxGlGqysrFria/Hx8VG+Xurq6uTk5EyeUp6enoqKioi2ka+vr8TExDykRTa+R42Nj/f39/Dw8DecPvz8/BHUIuzs7LKyvbKysv39/X19fdbW1uvr6/X19dLS0tPT07y8vMbGxju8S9zc2yyoN066WtjY2Fy1ZY7BkkrRWs/y07e3ub+/vz7ETRGsIszMy8rKyh2sLc/P2sDAwEfOVxG3ItbW5M/P0BGyIiWvNhWyJoa3jMnJ0Bq4J5DDlBiwKbi4uF21aKXNqjG5QiGuLSO1MyqzOsHBw6enqlTcZVXdZjnASeTk4xHFHxKjI6OjpODg373YwESwUcPDw8zMzErSW6PorEHJUhGmH93e3c/Pzxa3IxG2IqDOptra2q6usRqrJ0bOV0XMVROqJELKU9bW43/Ch9HR2xO2JNnZ2aSkpM7O1BGiIhe1Jx2rLlPbZN/f34S2i7a2tkS4Uaioq8LCwv///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJAALAAAAAAQABAAAAj/ACEJhNSBhg4DBnTQ6DBwoIACBm58AADggwIDBQQ4dOAIAAUMO3ZgoFDmgQONkHA8SOShzxgOHMTA8cCDAQ5IK7Kk8SEE0YCfAx7p8fFj0QoFSa4YcXOg6YEhjx6RCVJEQQ4eQJqgQMFFyhYEAbR8AYIkR4k5GfY8OnRmDdg/hZRkYFNiQ5seb24UYCQngB0+R7D0YLJhApQGXgrcAasmigQJhhqAmXCBCJUuU8ACcLKgcx5FeC7UGETohJVAAOokWE3nRBU0NSCZaASIhYY4LlyY0cBiSRgTAlXEsPCERIgKFUKQ8GMhhgpIMmyAiJACBoHrBGCkiADChowWLwRBD2AgYsSMGSNEMIDw40WLgAA7";
        let SSPsouce = "data:image/gif;base64,R0lGODlhEAAQAPeQAObm5uLi4vr6+kvTXNra69XV1b29vT/HUN7e3hHQItDQ0BHEIr6+vlWsXcvLy8HBwc3NzampqRG4IrS0tJzQohCEE6Ojp8fHx2rFdS+sOxGlGqysrFria/Hx8VG+Xurq6uTk5EyeUp6enoqKioi2ka+vr8TExDykRTa+R42Nj/f39/Dw8DecPvz8/BHUIuzs7LKyvbKysv39/X19fdbW1uvr6/X19dLS0tPT07y8vMbGxju8S9zc2yyoN066WtjY2Fy1ZY7BkkrRWs/y07e3ub+/vz7ETRGsIszMy8rKyh2sLc/P2sDAwEfOVxG3ItbW5M/P0BGyIiWvNhWyJoa3jMnJ0Bq4J5DDlBiwKbi4uF21aKXNqjG5QiGuLSO1MyqzOsHBw6enqlTcZVXdZjnASeTk4xHFHxKjI6OjpODg373YwESwUcPDw8zMzErSW6PorEHJUhGmH93e3c/Pzxa3IxG2IqDOptra2q6usRqrJ0bOV0XMVROqJELKU9bW43/Ch9HR2xO2JNnZ2aSkpM7O1BGiIhe1Jx2rLlPbZN/f34S2i7a2tkS4Uaioq8LCwv///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJAALAAAAAAQABAAAAj/ACEJhNSBhg4DBnTQ6DBwoIACBm58AADggwIDBQQ4dOAIAAUMO3ZgoFDmgQONkHA8SOShzxgOHMTA8cCDAQ5IK7Kk8SEE0YCfAx7p8fFj0QoFSa4YcXOg6YEhjx6RCVJEQQ4eQJqgQMFFyhYEAbR8AYIkR4k5GfY8OnRmDdg/hZRkYFNiQ5seb24UYCQngB0+R7D0YLJhApQGXgrcAasmigQJhhqAmXCBCJUuU8ACcLKgcx5FeC7UGETohJVAAOokWE3nRBU0NSCZaASIhYY4LlyY0cBiSRgTAlXEsPCERIgKFUKQ8GMhhgpIMmyAiJACBoHrBGCkiADChowWLwRBD2AgYsSMGSNEMIDw40WLgAA7";
        let billingType = "Mixed";
        await cpqQuote.quote1.quote.handleAssertPricingSummaryForPSPerfomance(totalRevenue, discountPercent, effort, totalMarginPlusOnePer, totalMarginMinusOnePer, marginSource, SSPsouce, billingType);
    });

});
