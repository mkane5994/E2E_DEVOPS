describe("01_neovscf", function () {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    const payload = require("../neovscf_data.json");
    // Credentials
    const username = browser.config.params.username;
    const passwordIST = browser.config.params.passwordIST;
    let cURL = "";
    const password = browser.config.params.passwordFE;
    const passwordBE = browser.config.params.passwordBE;
    const passwordCPQ = browser.config.params.passwordCPQ1;
    const boverall = new Date();
    const y = {
        project: "devopsneovscfcflp",
        duration: "00",
        step : "",
        runlabel : new Date(),
        finishflg : "N",
        overalltime : "00"
    }

    it("Step 0A: Login to CPQ", async function () {
        const b = new Date();
        //await common.navigation.navigateToUrl("https://sap-ies-sales-test.cpq.cloud.sap/fed/sap/");
        await cpqQuote.quote1.quote.logInCPQ(username, passwordCPQ, "sap");
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 0A: Login to CPQ";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });

    it("Step 0B: login Sap Cloud", async function () {
        const b = new Date();
        await opportunity.harmonyQuote.hqOverall.navigateToTsystemAppAccountView(payload.E2ETest.ACCOUNT);
        await opportunity.harmonyQuote.hqOverall.loginSapCloudSAML2(username, password);
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 0B: login Sap Cloud";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
//------ Do not modify above lines for credentials and environment ----------------------------------------------------------
// Note must be logged in too both environments before beginning with same user
// ***************************************************************************************************************************


    it("Step 01: Deal List Harmony in Neo FLP", async function () {
        const b = new Date();
        await common.navigation.navigateToUrl("https://fiorilaunchpad-qa.sap.com/sites#harmonyquote-Display");
        await nonUi5.element.isPresentByXPath('//*[contains(text(),"304894789")]');
        //let elem = await nonUi5.element.getById("searchFieldInShell-input-inner");
        //common.assertion.expectTrue(await nonUi5.element.isPresent(elem));
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 01: Deal List Harmony in Neo FLP";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });

    it("Step 02: Deal List Harmony in CF plus cFLP", async function () {
        const b = new Date();
        await common.navigation.navigateToUrl("https://sapit-home-test-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display?sap-ui-app-id-hint=1ff99794-b150-4e6d-ad32-d960c79f9a7a&/");
        await nonUi5.element.isPresentByXPath('//*[contains(text(),"304894789")]');
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 02: Deal List Harmony in CF plus cFLP";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    it("Step 03: Opportunity Harmony in Neo FLP", async function () {
        const b = new Date();
        await common.navigation.navigateToUrl("https://fiorilaunchpad-qa.sap.com/sites#harmonyquote-Display&/Opportunity/304856010");
        await nonUi5.element.isPresentByXPath('//*[contains(text(),"Phase Deal")]');
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 03: Opportunity Harmony in Neo FLP";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    it("Step 04: Opportunity Harmony in CF plus cFLP", async function () {
        const b = new Date();
        await common.navigation.navigateToUrl("https://sapit-home-test-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display?sap-ui-app-id-hint=1ff99794-b150-4e6d-ad32-d960c79f9a7a&/Opportunity/304856010");
        await nonUi5.element.isPresentByXPath('//*[contains(text(),"Phase Deal")]');
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 04: Opportunity Harmony in CF plus cFLP";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });

    it("Step 05: Opportunity and Quote Harmony in Neo FLP", async function () {
        const b = new Date();
        await common.navigation.navigateToUrl("https://fiorilaunchpad-qa.sap.com/sites#harmonyquote-Display&/Opportunity/304856010/Quotedetails/207513010582");
        await nonUi5.element.isPresentByXPath('//*[@id="quote-info-section"]');
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 05: Opportunity and Quote Harmony in Neo FLP";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });

    it("Step 06: Opportunity and Quote Harmony in CF plus cFLP", async function () {
        await util.browser.sleep(5000);
        const b = new Date();
        await common.navigation.navigateToUrl("https://sapit-home-test-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display?sap-ui-app-id-hint=1ff99794-b150-4e6d-ad32-d960c79f9a7a&/Opportunity/304856010/Quotedetails/207513010582");
        await nonUi5.element.isPresentByXPath('//*[@id="quote-info-section"]');
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.finishflg = "Y"
        y.step = "Step 06: Opportunity and Quote Harmony in CF plus cFLP";
        const eoverall = new Date();
        const durationO = (eoverall - boverall);
        y.overalltime = durationO;
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2);
    });
  
});