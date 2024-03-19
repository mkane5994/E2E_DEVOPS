describe("BackEnd_ARTPUBCL_Large_BoM_Cloud_90", function () {

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('piops_large_bom');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 

    // MAIN SCRIPT
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    // Load
    const payload = require("../data/QMATE_E2E_Data.json");
    // const payload = require("../data/ICT_OpportunityData.json");

    // https://jira.tools.sap/browse/ITSOMEGA-511  
    // https://jira.tools.sap/browse/ITSOMEGA-685 
    
    // Credentials
    // const username = browser.config.params.username;
    // const password = browser.config.params.passwordFE;
    //const passwordBE = browser.config.params.passwordBE;
    //const url = browser.config.params.systemUrl + "/sap/opu/odata/sap/zharmony_callidus_srv/";
    //Init variables
    // let sDealID = "304978603";          
    // let sQuoteID = "009593000785";   
    let sDealID = "304381366"
    let sQuoteID = "115892000053" 
    let sDealIDProd = "305240357"
    let sQuoteIDProd = "115892000079" 
      
    // let sAccountName = "";
    // let attendance;
    // const sDealDescription = "Perf Test Qmate 20231106 1";
    // const sContactPerson = "32878630";

    //**************************************************************************************************************************
    // it("Init service", async function () {
    //     
    //     attendance = await service.odata.init(url, username, passwordBE, false, {"sap-client": "001"}); 
    //     
    //     
    //     octobus_payload.dataset.duration = durationx;
    //     octobus_payload.dataset.step = "Init service";
    //     let res = await service.rest.post(octobus_payload.octobus.octurl, octobus_payload.dataset, octobus_payload.octobus.config2); 
    // });

    // it("Prepare data", async function () {
    //     
    //     payload.directStandard.DESCRIPTION = sDealDescription;
    //     payload.directStandard.STARTDATE = new Date();
    //     
    //     
    //     octobus_payload.dataset.duration = durationx;
    //     octobus_payload.dataset.step = "Prepare data";
    //     let res = await service.rest.post(octobus_payload.octobus.octurl, octobus_payload.dataset, octobus_payload.octobus.config2); 
    // });

    it("Login to CPQ", async function () {

        await common.navigation.navigateToUrl(browser.config.params.cpqUrl);
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");

    });

    it("Login Sap Cloud", async function () {

        // await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppAccountView(payload.E2ETest.ACCOUNT);
        const sUrl = `${browser.config.params.sapCloudUrl}/Account/${payload.E2ETest.ACCOUNT}`
        await common.navigation.navigateToUrl(sUrl);

        // 
        if (browser.config.params.environment === "prod"){
            const nameElem = await nonUi5.element.getByCss("INPUT[id='j_username']");
            const pswElem = await nonUi5.element.getByCss("INPUT[id='j_password']");
            const submitElem = await nonUi5.element.getByCss("BUTTON[id='logOnFormSubmit']");
            await nonUi5.userInteraction.fill(nameElem, testModule.userCredentials.usernameSAPCloud);
            // if (browser.config.params.environment === "test"){
            //     await nonUi5.userInteraction.click(submitElem);
            // }
            await nonUi5.userInteraction.fill(pswElem, testModule.userCredentials.passwordSAPCloud);
            await nonUi5.userInteraction.click(submitElem);
        } else if(browser.config.params.environment === "test"){
            await opportunity.harmonyQuote.hqOverall.loginSapCloudSAML2(testModule.userCredentials.usernameSAPCloud, testModule.userCredentials.passwordSAPCloud);
        }

    });
    
    // Load the main quote 
    it("Load the main quote", async function(){

        if (browser.config.params.environment === "prod"){
            const sUrl = `${browser.config.params.sapCloudUrl}/Opportunity/${sDealIDProd}/Quotedetails/${sQuoteIDProd}`;
            await common.navigation.navigateToUrl(sUrl);
        } else if(browser.config.params.environment === "test"){
            const sUrl = `${browser.config.params.sapCloudUrl}/Opportunity/${sDealID}/Quotedetails/${sQuoteID}`;
            await common.navigation.navigateToUrl(sUrl);
        }
        // await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppOpportunityQuote(sDealID, sQuoteID);
        // await nonUi5.element.isPresentByXPath('//*[@id="quote-info-section"]');
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }

        }, 1410); 


    it("01: Wait for page BODY to be loaded", async function () {

        // await util.browser.sleep(2000);
        await nonUi5.element.waitToBeVisible("BODY");
        
        }, 1410);  

    it("Switch to iFrame callidus_frame", async function () {

        await util.browser.switchToIframe("IFRAME[id*='callidus_frame']");

    });
            
    // Edit Phase in Phase Builder	
    it("Click the 'Edit Phase' button", async function () {
        
        const elem = await nonUi5.element.getByXPath("//*[@class='fiori3-quote-section-header']");
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        const el = await nonUi5.element.getByXPath("//*[@id='items-section']/div[1]/div/div[2]/div/div[1]/div/a[1]/button");
        await nonUi5.userInteraction.click(el);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        // await cpqQuote.quote1.quote.clickEditPhase();

    }, 1410);  
    // Save Phase Builder 
    it("Click the 'Save Phase' button", async function () {

        await cpqQuote.quote1.quote.clickSavePhase();

    }, 1410);
    
    //Change quantity
    
    //Change quantity (Discount)
    
    //Multi line edit Open
    
    //Multi line save chenges to Quote

    //Reprice 
    it("Reprice", async function () {

        // await util.browser.sleep(200);
        cpqQuote.quote1.quote.clickReprice();

    }, 14100);


    it("02: Wait for page BODY to be loaded", async function () {

        // await util.browser.sleep(200);
        await nonUi5.element.waitToBeVisible("BODY");

    }, 14100);
    
    // Save Quote

    it("01: Save the Quote", async function () {

        await cpqQuote.quote1.quote.clickSaveQuote(); 

    }, 14100);


    it("03: Wait for page BODY to be loaded", async function () {
        
        await nonUi5.element.waitToBeVisible("BODY");
        
    }, 14100);  	 
    
    //Switch pages
    it("Switch to next page", async function () {
        
        let elem = await nonUi5.element.getByXPath("//*[@id='cartPager_nextPage']");
        await nonUi5.userInteraction.click(elem);
        
    }, 1410);
    
    //Switch pages
    it("Switch to first page", async function () {
        
        let elem = await nonUi5.element.getByXPath("//*[@id='cartPager_firstPage']");
        await nonUi5.userInteraction.click(elem);
        
    }, 1410); 
    
    // Click the 'Provisioning Details
    it("Click the 'Provisioning Details' button", async function () {
        
        await cpqQuote.quote1.quote.clickProvisiongDetails(); 
        
    }, 1410);
    
    // it("Click on checkbox to confirm Provisioning Details", async function () {

    //     await cpqQuote.quote1.quote.handleProvisiongDetails();

    // }, 1410);
    
    it("Click the SAVE Provisioning Details button", async function () {
        
        if (browser.config.params.environment === "prod"){
            let elem = await nonUi5.element.getByXPath("//*[@class='btn btn-primary fiori3-btn-primary']");
            await nonUi5.userInteraction.click(elem);
        } else if (browser.config.params.environment === "test"){
            await cpqQuote.quote1.quote.clickSaveProvisiongDetails(); 
        }
       
    }, 1410);
    
    // MARK as main
        
    // Terms and Conditions tab 
    it("Open Terms and Conditions tab", async function(){
        
        await cpqQuote.quote1.quote.navigateToTab("Terms and Conditions");
        
    }, 14100);
    it("Check the Risk factors checkbox", async function(){
        
        await cpqQuote.quote1.termsConditionsTab.selectRiskFactors();
        
    }, 14100);

    it("Check the CAA Template checkbox", async function(){
    
        let elem = await nonUi5.element.getByXPath("//*[@id='customFieldsBox']/div[3]/div[1]/div[4]/ul/li/p/span/label/span");
        await nonUi5.userInteraction.click(elem);
            
    }, 14100); 

    it("Click on Save Terms and Conditions", async function(){
        
        await cpqQuote.quote1.termsConditionsTab.clickSaveTermsConditions();
        
    }, 14100);


    it("01: Navigate to tab Quote", async function(){
        
        await cpqQuote.quote1.quote.navigateToTab("Quote"); 

    }, 14100);

        //GTS check
        
        //Custom action / AR check

        //  Attach program check
    
    
    // Refresh Deal health
    it("Click the 'Refresh Deal Health' button", async function() {
        
        await cpqQuote.quote1.quote.clickRefreshDealHealthAlt();
        
    }, 1410);


    it("04: Wait for page BODY to be loaded", async function () {

        await nonUi5.element.waitToBeVisible("BODY");
        
    }, 1410);
    
    it("Click the 'Request Review/Input' button", async function() {

        // if (browser.config.params.environment === "prod"){
        const elem = await nonUi5.element.getByCssContainingText("A", "Request Review/Input");
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        await cpqQuote.quote1.quote.handleWaitForBusyIndicatorToDisappear();
        // } else if(browser.config.params.environment === "test"){
        //     await cpqQuote.quote1.quote.clickRequestReviewInput(); 
        // }
        
    }, 1410);

    it("Click the 'Request Review/Input' SAVE button", async function() {

        await cpqQuote.quote1.quote.clickSaveReviewInput();
        
    }, 1410);
    
    // Navigate to the 'Review/Approval' tab
    it("Navigate to the 'Review/Approval' tab", async function () {
        
        await cpqQuote.quote1.reviewTab.navigateToReviewTab();
        
    }, 1410); 

    it("02: Navigate to tab Quote", async function(){
        
        await cpqQuote.quote1.quote.navigateToTab("Quote");
        
    }, 1410); 
    
    // Save Quote

    it("02: Save the Quote", async function () {
        
        await cpqQuote.quote1.quote.clickSaveQuote(); 
        
    }, 14100);


    it("05: Wait for page BODY to be loaded", async function () {
        
        await nonUi5.element.waitToBeVisible("BODY");
        
    }, 14100);
    
    // Messages in the Quote
    it("Click to open the messages button", async function () {
        
        await cpqQuote.quote1.messages.clickMessagesDialog();
        
    }, 1410);

    it("Click a message category (e.g., All, Error, Warning, Info)", async function () {
        
        await cpqQuote.quote1.messages.clickMessageCategory("Warning");
        
    });

    it("Click to close the messages button", async function () {
        
        await cpqQuote.quote1.messages.clickMessagesDialog();
        
    }); 
    
});