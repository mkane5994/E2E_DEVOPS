describe("Post_RD", function () {
    // MAKE SURE IT SCROLLS TO ELEMENT FIRST
    // find the element in different step to save from time
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    let sDealID = "304381366"
    let sQuoteID = "115892000053" 
    let sDealIDProd = "305240357"
    let sQuoteIDProd = "115892000079" 
    
    const octobus_payload= require("../data/octobus.json");
    const payload = require("../data/QMATE_E2E_Data.json");

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('Post_RD');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);

    it("Login to CPQ", async function () {
        
        const start = new Date();
        await common.navigation.navigateToUrl(browser.config.params.cpqUrl);
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
        const finish = new Date();
        
        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
    });

    it("Login Sap Cloud", async function () {

        // await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppAccountView(payload.E2ETest.ACCOUNT);
        const sUrl = `${browser.config.params.sapCloudUrl}/Account/${payload.E2ETest.ACCOUNT}`
        await common.navigation.navigateToUrl(sUrl);

        const start = new Date();
        if (browser.config.params.environment === "prod"){
            const nameElem = await nonUi5.element.getByCss("INPUT[id='j_username']");
            const pswElem = await nonUi5.element.getByCss("INPUT[id='j_password']");
            const submitElem = await nonUi5.element.getByCss("BUTTON[id='logOnFormSubmit']");
            await nonUi5.userInteraction.fill(nameElem, testModule.userCredentials.usernameSAPCloud);
            await nonUi5.userInteraction.fill(pswElem, testModule.userCredentials.passwordSAPCloud);
            await nonUi5.userInteraction.click(submitElem);
        } else if(browser.config.params.environment === "test"){
            await opportunity.harmonyQuote.hqOverall.loginSapCloudSAML2(testModule.userCredentials.usernameSAPCloud, testModule.userCredentials.passwordSAPCloud);
        }
        const finish = new Date();
        
        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });

    it("Quote load", async function(){

        const start = new Date();
        if (browser.config.params.environment === "prod"){
            const sUrl = `${browser.config.params.sapCloudUrl}/Opportunity/${sDealIDProd}/Quotedetails/${sQuoteIDProd}`;
            await common.navigation.navigateToUrl(sUrl);
        } else if(browser.config.params.environment === "test"){
            const sUrl = `${browser.config.params.sapCloudUrl}/Opportunity/${sDealID}/Quotedetails/${sQuoteID}`;
            await common.navigation.navigateToUrl(sUrl);
        }
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const finish = new Date();
        
        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

        }); 

    it("Switch to iFrame callidus_frame", async function () {

        const start = new Date();
        await util.browser.switchToIframe("IFRAME[id*='callidus_frame']");
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });
    
    it("Open Terms and Conditions tab", async function(){

        // await cpqQuote.quote1.quote.navigateToTab("Terms and Conditions");
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);

        const elem = await nonUi5.element.getByCssContainingText(`//a[contains(@class,"cartTab")][contains(text(),"Terms and Conditions")]`);

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="terms-and-conditions-section"]/div/div[2]/div/div[1]/div[2]/div[1]`,timeout=190000);
        
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
        
    }); 

    it("Check the Risk factors checkbox", async function(){
        
        // await cpqQuote.quote1.termsConditionsTab.selectRiskFactors();
        const elem = await nonUi5.element.getByXPath('//*[@id="customFieldsBox"]/div[3]/div[1]/div[2]/ul/li/p/span/label/span');
        await nonUi5.userInteraction.scrollToElement(elem, "center");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
        
    });

    it("Check the CAA Template checkbox", async function(){
    
        let elem = await nonUi5.element.getByXPath("/html/body/div[3]/div[2]/div/div/div/div[2]/div[3]/div[3]/div[1]/div[4]/ul/li/p/span/label/span");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

        
    }); 

    it("Click on Save Fields and Checklist", async function(){
        
        // await cpqQuote.quote1.termsConditionsTab.clickSaveTermsConditions();
        const elem = await nonUi5.element.getByXPath('//*[@id="tc-tabs-container"]/div[2]/button');
        await nonUi5.userInteraction.scrollToElement(elem, "center");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="terms-and-conditions-section"]/div/div[2]/div/div[1]/div[2]/div[1]`,timeout=190000);

        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });

    // Second cycle to uncheck

    it("Uncheck the Risk factors checkbox", async function(){
        
        // await cpqQuote.quote1.termsConditionsTab.selectRiskFactors();
        const elem = await nonUi5.element.getByXPath('//*[@id="customFieldsBox"]/div[3]/div[1]/div[2]/ul/li/p/span/label/span');
        await nonUi5.userInteraction.scrollToElement(elem, "center");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        const finish = new Date();
 
        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });

    it("Uncheck the CAA Template checkbox", async function(){
    
        let elem = await nonUi5.element.getByXPath("/html/body/div[3]/div[2]/div/div/div/div[2]/div[3]/div[3]/div[1]/div[4]/ul/li/p/span/label/span");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
          
    }); 

    it("Click on Save Terms and Conditions", async function(){
        
        // await cpqQuote.quote1.termsConditionsTab.clickSaveTermsConditions();
        const elem = await nonUi5.element.getByXPath('//*[@id="tc-tabs-container"]/div[2]/button');
        await nonUi5.userInteraction.scrollToElement(elem, "center");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="terms-and-conditions-section"]/div/div[2]/div/div[1]/div[2]/div[1]`,timeout=190000);

        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });

    it("Navigate to the 'Review/Approval' tab", async function () {
        
        // await cpqQuote.quote1.reviewTab.navigateToReviewTab();
        const elem = await nonUi5.element.getByCssContainingText("A[class='cartTab']", "Review/Approval");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="cartContainer"]/div/div/div[2]/div[3]/div/div/div/div[1]/label`,timeout=190000);

        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
           
    }); 

    it("Navigate to tab Quote", async function(){
        
        // await cpqQuote.quote1.quote.navigateToTab("Quote");
        const elem = await nonUi5.element.getByCssContainingText(`//a[contains(@class,"cartTab")][contains(text(),"Quote")]`);
        
        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);

        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
         
    }); 

    it("Change Units Qty from 0 to 10", async function () {

        // await cpqQuote.quote1.products.fillQuantity(10, 1)
        const elem = await nonUi5.element.getByXPath(`//input[@id='Quantity_1_1']`);
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        await nonUi5.userInteraction.clearAndFill(elem, 10);

        const start = new Date();
        await common.userInteraction.pressEnter();
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="items-section"]/div[1]/span`,timeout=190000);

        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
           
    });

    // it("Click on Mark as Main", async function () {

    //     //await cpqQuote.quote1.quote.clickMarkAsMain(); 
    //     const elem = await nonUi5.element.getByXPath(`/html/body/div[3]/div[2]/div/div/div/div[4]/div[1]/div[1]/div/div[2]/div[2]/a/span`);
    //     await nonUi5.userInteraction.click(elem);
    //     if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
    //         await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
    //     }

    // });

    it("Switch to next page", async function () {
       
        // DOES NOT WORK SO WELL FOR NOW

        let elem = await nonUi5.element.getByXPath("//*[@id='cartPager_nextPage']");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
            
    });


    it("Add one product", async function () {
        
        const elem = await nonUi5.element.getByCss("INPUT[id='quickAddInput']");
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.clearAndFill(elem, 8006126);

        const start = new Date();
        await common.userInteraction.pressEnter();
        await nonUi5.element.waitToBePresent("BUTTON[class*='btn btn-primary fiori3-btn-primary']",timeout=190000);
        const addBtn = await nonUi5.element.getByCssContainingText("BUTTON[class*='btn btn-primary fiori3-btn-primary']", "Add");
        await nonUi5.userInteraction.click(addBtn);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="items-section"]/div[1]/span`,timeout=190000);

        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
               
    });

    it("Click the 'Edit Phase' button", async function () {
        
        const elem = await nonUi5.element.getByXPath("//*[@class='fiori3-quote-section-header']");
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        const el = await nonUi5.element.getByXPath("//*[@id='items-section']/div[1]/div/div[2]/div/div[1]/div/a[1]/button");

        const start = new Date();
        await nonUi5.userInteraction.click(el);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        } 
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });  

    it("Delete product", async function () {

        // DOES NOT WORK SO WELL FOR NOW

        const el = await nonUi5.element.getByXPath(`//*[@id="containerTable_3365"]/tbody/tr[7]/td[4]/ul/li[1]/label/span`);

        const start = new Date();
        await nonUi5.userInteraction.click(el);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const finish = new Date();

        // await nonUi5.element.waitToBePresent(`//*[@id="1790607"]/div[1]/span/label`,timeout=190000);   
        
        console.log("current test" , finish - start);
        
    }); 

    it("Save 'Edit Phase' button", async function () {
        
        const el = await nonUi5.element.getByXPath(`//*[@id="actionsContainer"]/div[1]/div[1]/div[2]/div[1]/button[1]/span`);

        const start = new Date();
        await nonUi5.userInteraction.click(el);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }    
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);

        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
              
    });  

    it("Multi line edit", async function () {

        const elem = await nonUi5.element.getByXPath("//*[@class='fiori3-quote-section-header']");
        const alignment = { block: "nearest", inline: "nearest" };
        await nonUi5.userInteraction.scrollToElement(elem, alignment);
        const el = await nonUi5.element.getByXPath(`//*[@id="items-section"]/div[1]/div/div[2]/div/div[1]/div/a[2]/button`);

        const start = new Date();
        await nonUi5.userInteraction.click(el);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }   
        await nonUi5.element.waitToBePresent(`//*[@id="actionsContainer"]/div[1]/div[1]/div[1]/h3`,timeout=190000)
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
        
    }); 

    it("Save multi line edit", async function () {
        
        const el = await nonUi5.element.getByXPath(`/html/body/div[3]/div[2]/div[2]/div[2]/div/div[2]/div[1]/div[1]/div[2]/div[1]/button[1]/span`);
        
        const start = new Date();
        await nonUi5.userInteraction.click(el);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }    
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000)
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
                
    });

    it("Click the 'Provisioning Details' button", async function () {

        const el = await nonUi5.element.getByXPath(`//*[@id="items-section"]/div[1]/div/div[2]/div/div[1]/div/a[3]/button`);

        const start = new Date();
        await nonUi5.userInteraction.click(el);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="actionsContainer"]/div[1]/div[1]/div[1]/h3`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
              
    });

    it("Click on checkbox to confirm Provisioning Details", async function () {
        
        // DOES NOT WORK SO WELL FOR NOW

        // await cpqQuote.quote1.quote.handleProvisiongDetails();
        const elem = await nonUi5.element.getByXPath('//*[@id="PD_ProvisioningReview"]/li/p/span/label/span');
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });

    it("Click the SAVE Provisioning Details button", async function () {
        
        let elem = await nonUi5.element.getByXPath("//*[@class='btn btn-primary fiori3-btn-primary']");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });

    it("Reprice", async function () {

        const scrollToElem = await nonUi5.element.getByXPath("//*[@class='fiori3-quote-section-header']");
        const alignment = { block: "nearest", inline: "nearest" };

        const elem = await nonUi5.element.getByCss(".add-product.pull-left button");

        await nonUi5.userInteraction.scrollToElement(scrollToElem, alignment);

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }  
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
               
    });
    
    it("Save the Quote", async function () {

        // await cpqQuote.quote1.quote.clickSaveQuote(); 
        let elem = await nonUi5.element.getByXPath(`//*[@id="cartHeader"]/div[1]/div/div[2]/div[1]/a/span`);

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);

    });

    it("Click the 'Request Review/Input' button", async function() {

        const elem = await nonUi5.element.getByCssContainingText("A", "Request Review/Input");

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        await nonUi5.element.waitToBePresent(`//*[@id="1548887"]/label/b/h1`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
              
    });

    it("Click the 'Request Review/Input' SAVE button", async function() {

        let elem = await nonUi5.element.getByXPath(`//*[@id="actionsContainer"]/div[1]/div[1]/div[2]/div[1]/button[1]/span`);

        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
               
    });

    it("AR check", async function(){
        
        // await cpqQuote.quote1.quote.navigateToTab("Quote");
        const elem = await nonUi5.element.getByXPath('//*[@id="Deal-health-section"]/div[6]/div/div/div/div/div/div[2]/div/li/a/div/span');
        
        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
                
    }); 

    it("GTS check", async function(){
        
        // await cpqQuote.quote1.quote.navigateToTab("Quote");
        const elem = await nonUi5.element.getByXPath('//*[@id="Deal-health-section"]/div[5]/div/div/div/div/div[2]/div/li/a/div/span[1]');
        
        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
                
    }); 

    it("Attach program check", async function(){
        
        // await cpqQuote.quote1.quote.navigateToTab("Quote");
        const elem = await nonUi5.element.getByXPath('//*[@id="Deal-health-section"]/div[8]/div/div/div/div/div[2]/div/li/a/div/span[1]');
        
        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
               
    }); 

    // it("Click save button in attach program check", async function(){
        
    //     // await cpqQuote.quote1.quote.navigateToTab("Quote");
    //     const elem = await nonUi5.element.getByCssContainingText(`//*[@id="actionsContainer"]/div[1]/div[1]/div[2]/div[1]/button[1]`);
        
    //     const start = new Date();
    //     await nonUi5.userInteraction.click(elem);
    //     if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
    //         await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
    //     }
    //     await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
    //     const finish = new Date();
    //     console.log("current test" , finish - start);
        
    // }); 

    it("Pre-Requisite Check Status", async function(){
        
        // await cpqQuote.quote1.quote.navigateToTab("Quote");
        const elem = await nonUi5.element.getByXPath('//*[@id="hide_pre_req"]/div/div/div/div/div[2]/div/li/a/div/span[1]');
        
        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
                
    }); 

    it("Click the 'Refresh Deal Health' button", async function() {
        
        // await cpqQuote.quote1.quote.clickRefreshDealHealthAlt();
        const elem = await nonUi5.element.getByXPath('//*[@id="cartHeader"]/div[1]/div/div[2]/div[2]/a/span');
        
        const start = new Date();
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']",timeout=190000)) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        await nonUi5.element.waitToBePresent(`//*[@id="quote-info-section"]/div[1]/span`,timeout=190000);
        const finish = new Date();

        const duration = finish - start;
        octobus_payload.dataset.duration = duration;
        console.log("current test" , duration);
        
    });

});