describe("01_QMATE_E2E", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('devopse2e');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 
    // MAIN SCRIPT
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    // Load
    const payload = require("../data/QMATE_E2E_Data.json");
    // Credentials
    //const passwordIST = browser.config.params.passwordIST;
    //const passwordBE = browser.config.params.passwordBE;
    //let cURL = "";
    const username = browser.config.params.username;
    const password = browser.config.params.passwordFE;

    it("Login to CPQ", async function () {
        
        await common.navigation.navigateToUrl(browser.config.params.cpqUrl);
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
        
    });

    it("Login Sap Cloud", async function () {
        
        const sUrl = `${browser.config.params.sapCloudUrl}${payload.E2ETest.ACCOUNT}`;
        await common.navigation.navigateToUrl(sUrl);
        // await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppAccountView(payload.E2ETest.ACCOUNT);
        await opportunity.harmonyQuote.hqOverall.loginSapCloudSAML2(username, password);
        
    });
    //------ Do not modify above lines for credentials and environment ----------------------------------------------------------
    // Note must be logged in too both environments before beginning with same user
    // ***************************************************************************************************************************

    /*
    ------------------------------------------------------------------
                        High Level Steps
    ------------------------------------------------------------------
    Step 01: Open URL
    Step 02: Create New Deal
    Step 03: Input Deal Description
    Step 04: Input Close Date
    Step 05: Input Main Account Contact
    Step 06: Input Sales Org
    Step 07: Click Create Deal Button
    Step 08: Add Contact Button in Oppty
    Step 09: Drop Down Role
    Step 10 Choose IT Contact Role
    Step 11 Input Contact IT Person
    Step 12: Click on Save Opportunity
    ------------ Quote Process -----------------------------------------
    Step 13: Create Quote from Opportunity
    Step 14: Select CPQ1
    Step 15: Click Ok - Confirm Quote creation
    Step 16: Wait for Quote Creation
    Step 17: Switch to iFrame callidus_frame
    Step 18: Get Quote-ID from created Quote
    Step 19: Add Product
    Step 20: Click on reprice
    Step 21: Click on Mark as Main
    Step 22: Click on Save Quote
    Step 23: Click on Terms and Conditions Tab
    Step 24: Click on Compliance Checkbox
    Step 25: Click on Save Fields and Checklist
    Step 26: Click Quote Tab
    Step 27: Click on Save Quote
    */

    it("Open URL", async function () {
        
        const sUrl = `${browser.config.params.sapCloudUrl}/Account/${payload.E2ETest.ACCOUNT}`
        await common.navigation.navigateToUrl(sUrl);
        //await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppAccountView(payload.E2ETest.ACCOUNT);
        // await util.browser.sleep(20000);
        
    });

    it("Create New Deal", async function () {
        
        await opportunity.harmonyQuote.accountView.clickNewDeal(false);
        
    });

    it("Input Deal Description", async function () {
        
        await opportunity.harmonyQuote.createDeal.expectTextCreateButton();
        await opportunity.harmonyQuote.createDeal.fillDescription(payload.E2ETest.DESCRIPTION + " " + ((new Date()).toString()));
        
    });

    
    it("Input Close Date", async function () {
        
        await opportunity.harmonyQuote.createDeal.fillCloseDate(payload.E2ETest.CLOSE_DATE);
        
    });

    it("Input Main Account Contact", async function () {
        
        let elem = await nonUi5.element.getById("__input3-inner");
        await nonUi5.userInteraction.click(elem);
        await nonUi5.userInteraction.fill(elem, payload.E2ETest.MAIN_CONTACT);
        await opportunity.harmonyQuote.createDeal.selectSingleContact();
        
    });

    it("Input Sales Org", async function () {
        
        const selectSalesOrgUS = {
            "elementProperties": {
                "viewName": "hdm.view.Account.view.AccountObjPage",
                "metadata": "sap.ui.core.Item",
                "text": payload.E2ETest.SALES_ORG_TXT 
            }
        };
        await opportunity.harmonyQuote.createDeal.clickSalesOrg();
        await ui5.userInteraction.click(selectSalesOrgUS);
        
    });

    it("Click Create Deal Button", async function () {
        
        await opportunity.harmonyQuote.createDeal.clickCreateButton();
        await util.browser.sleep(15000);
        await opportunity.harmonyQuote.hqOverall.switchToTab(1);
        await util.browser.sleep(3000);
        const sDealID = await util.browser.getCurrentUrl();
        console.log("Opportunity/Deal ID -->" + sDealID.slice(-9));
        await util.browser.logCurrentUrl();

    });

    it("Add Contact Button in Oppty", async function () {
        
        await opportunity.harmonyQuote.contacts.clickAddContact();
        
    });

    it("Drop Down Role", async function () {
        
        await opportunity.harmonyQuote.contacts.clickContactRoleDropdown();
        
    });

    it("Choose IT Contact Role", async function () {
        
        await opportunity.harmonyQuote.contacts.selectContactPersonITRole();
        
    });
    it("Input Contact IT Person", async function () {
        
        const selector = {
            "elementProperties": {
                "viewName": "hdm.view.OpportunityDetails.Details.CustomerContacts",
                "metadata": "sap.m.Input",
                "bindingContextPath": "/PartiesInvolved/results/13"
            }
        };
        await ui5.userInteraction.fill(selector, payload.E2ETest.CUSTOMERITCONTACT_NUMBER);
        await util.browser.sleep(2000);

    });


    it("Click on Save Opportunity", async function() {
        
        await opportunity.harmonyQuote.dealHeaderActions.clickSaveOpportunity();
        await util.browser.sleep(20000);

    });
    /*
    it("Step 13: click on Add High Level Item-Button", async function () {
        await opportunity.harmonyQuote.revenueHighLevel.clickOpenHighLevelDialog();
    });
    it("Step 14: Assert: only Cloud Tab is there", async function () {
        const selector = {
            "elementProperties": {
                "viewName": "hdm.view.OpportunityDetails/OpportunityDetails",
                "metadata": "sap.m.IconTabHeader"
            }
        };
        await ui5.assertion.expectAttributeToBe(selector, "selectedKey", "CLOUD");
    });
    it("Step 15: Set value 1000.00 as Revenue", async function () {
        await opportunity.harmonyQuote.revenueHighLevel.fillCloudRevenue("1000.00");
    });
    it("Step 16: Search with Prodcuct ID", async function(){
        await opportunity.harmonyQuote.revenueHighLevel.searchProduct(payload.E2ETest.HIGHLEVLEITEM);
    });
    it("Step 17: Click Expand line item", async function(){
        await opportunity.harmonyQuote.revenueHighLevel.clickExpandItemsList();
        await util.console.log('Wait - 2 sec');
        await util.browser.sleep(2000); 
    });
    it("Step 18: Select high level cloud Product", async function () {
        await opportunity.harmonyQuote.revenueHighLevel.selectCloud9004045Product(); 
        await util.console.log('Wait - 2 sec') 
        await util.browser.sleep(2000); 
    });
    it("Step 19: click ok-Button to select high level cloud product", async function () {
        await opportunity.harmonyQuote.revenueHighLevel.clickAddHighLevel();
    });
    it("Step 20: Click Save", async function () {
        await opportunity.harmonyQuote.dealHeaderActions.clickSaveOpportunity();
        await util.browser.sleep(10000);
    });
    */
    //-----------------------------Create Quote Process ------------------------------//

    it("Create Quote from Opportunity", async function () {

        await opportunity.harmonyQuote.revenue.clickCreateQuote();
        
    });

    it("Select CPQ1", async function () {
        
        await opportunity.harmonyQuote.revenue.clickQuote1();
        
    });

    it("Click Ok - Confirm Quote creation", async function () {
        
        await opportunity.harmonyQuote.revenue.clickConfirmQuoteSystemSelection();
        
    });

    it("Wait for Quote Creation", async function () {
        
        await util.browser.sleep(25000);
        await util.browser.refresh();
        await util.browser.sleep(5000);
        
    });

    it("Switch to iFrame callidus_frame", async function () {
        
        await util.browser.switchToIframe("IFRAME[id*='callidus_frame']");
        
    });

    it("Get Quote-ID from created Quote", async function(){
        
        browser.ignoreSynchronization=true;
        const elem = await nonUi5.element.getByCss("SPAN[title*='Quote #']");
        sQuoteID = await nonUi5.element.getAttributeValue(elem, "title");
        util.console.log("QuoteId ->" + sQuoteID.slice(7));
        browser.ignoreSynchronization=false;
        await util.browser.logCurrentUrl();

    }); 

    it("Add Product", async function () {
        
        await cpqQuote.quote1.products.clickAddProduct(payload.E2ETest.PRD001);
        // await util.browser.sleep(10000);

    });
    it("Click on reprice", async function () {
        
        await cpqQuote.quote1.quote.clickReprice();
        // await util.browser.sleep(10000);
        // await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();

    });

    it("Click on Mark as Main", async function () {
        // Takes care of reprice & GTS Check as well
        //await cpqQuote.quote1.quote.clickMarkAsMain();
        const elem = await nonUi5.element.getByCssContainingText("SPAN", "Mark as Main");
        await nonUi5.userInteraction.click(elem);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        await util.browser.sleep(1000);
        // await util.browser.sleep(20000);

    });


    it("01: Click on Save Quote", async function () {
        
        await cpqQuote.quote1.quote.clickSaveQuote();
        
    }); 

    //**************************************************** Complete Health Checklist *******************************************************
    it("Click on Terms and Conditions Tab", async function () {
        
        // await util.browser.sleep(10000);
        //https://sap-cpq-test.calliduscloud.com/quotation/QuoteProperty.aspx?TabId=49
        const elem = await nonUi5.element.getByXPath('//*[@id="cartHeader"]/div[2]/ul/li[3]/a');
        await nonUi5.userInteraction.click(elem);
        // await util.browser.sleep(5000);
        
    });

    it("Click on Compliance Checkbox", async function () {
        
        const elem = await nonUi5.element.getByXPath('//*[@id="customFieldsBox"]/div[3]/div[1]/div/ul/li/p/span/label/span');
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        
    });

    it("Click on Save Fields and Checklist", async function () {
        
        // await util.browser.sleep(5000);
        await cpqQuote.quote1.termsConditionsTab.clickSaveTermsConditions();
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();

    });

    it("Click Quote Tab", async function () {
    
        const elem = await nonUi5.element.getByXPath('//*[@id="cartHeader"]/div[2]/ul/li[1]/a');
        await nonUi5.userInteraction.click(elem);
        
    });

    it("02: Click on Save Quote", async function () {
        
        // await util.browser.sleep(5000);
        await cpqQuote.quote1.quote.clickSaveQuote();
        
    });
        //**************************************************** GTS Check  *******************************************************
        /* Done by Mark as Main */
        /* it("Click to Execute the GTS Check Status", async function () {
            const elem = await non_ui5.common.locator.getElementByXPath(
                '//label[text()="GTS Check Status"]/following-sibling::div'
            );
            await non_ui5.common.locator.scrollToElement(elem);
            await non_ui5.common.userInteraction.click(elem);
            await util.browser.sleep(12000);
        }); */
    });
