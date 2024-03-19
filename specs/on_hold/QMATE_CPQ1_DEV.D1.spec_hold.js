describe("01_CPQ1_DEV", function () {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    const payload = require("../QMATE_CPQ1_DEV_Data.json");
    // Credentials
    const username = browser.config.params.username;
    const passwordIST = browser.config.params.passwordIST;
    let cURL = "";
    const password = browser.config.params.passwordFE;
    const passwordBE = browser.config.params.passwordBE;
    const passwordCPQ = browser.config.params.passwordCPQ1;
    const boverall = new Date();
    const y = {
        project: "devopsazuredev",
        duration: "00",
        step : "",
        runlabel : new Date(),
        finishflg : "N",
        overalltime : "00"
    }

    it("Step 0A: Login to CPQ Dev", async function () {
        await util.browser.sleep(5000);
        const b = new Date();
        await cpqQuote.quote1.quote.logInCPQ(username, passwordCPQ, "sap");
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 0A: Login to CPQ Dev";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });



    it("Step 01: Open Small Quote", async function () {
        const b = new Date();
        const sUrl = "https://sap-ies-sales-dev.cpq.cloud.sap/Cart/Edit?cartCompositeNumber=002717000080";
        await common.navigation.navigateToUrl(sUrl);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 01: Open Small Quote";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
        //await util.browser.sleep(5000);
    });
    it("Step 01A: Clean Up", async function (){
        const b = new Date();
        let mainElem  = await nonUi5.element.isPresentByXPath(".//*[@id='itemsTable']/tr[10]//button");
        if (mainElem) {
            while (mainElem) {
                util.console.log("Line Item found")
                const elem = await nonUi5.element.getByXPath(".//*[@id='itemsTable']/tr[10]//button");
                await nonUi5.userInteraction.click(elem);
                let elem1 = await nonUi5.element.getByCss("BUTTON[title='Delete']");
                await nonUi5.userInteraction.click(elem1);
                const elem2 = await nonUi5.element.getByXPath(".//*[text()='OK']");
                await nonUi5.userInteraction.click(elem2);
                await util.browser.sleep(10000);
                util.console.log("Wait - 10 sec");
                mainElem  = await nonUi5.element.isPresentByXPath(".//*[@id='itemsTable']/tr[10]//button");
            }
        } else {
            util.console.log("Line Item NOT found");
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 01A: Clean Up";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 02: Add New Product", async function () {
        const b = new Date();
        await cpqQuote.quote1.products.clickAddProduct("8007905");
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 02: Add New Product";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 03: Expand Vertical Menu", async function () {
        const b = new Date();
        //manage items
        let elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[10]/td[4]/div/div[1]/div/button');
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 03: Expand Vertical Menu";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 04 Click on Trashcan", async function () {
        await util.browser.sleep(3000);
        const b = new Date();
        //let elem = await nonUi5.element.getByXPath("//*[@class='btn btn-sm btn-danger']");
        let elem = await nonUi5.element.getByCss("BUTTON[title='Delete']");
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 04 Click on Trashcan";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 05: Confirm Delete - OK", async function () {
        await util.browser.sleep(3000);
        const b = new Date();
        let elem = await nonUi5.element.getByXPath('//*[@id="confirmDialogContainer"]/div/div/div[3]/button[3]');
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 05: Confirm Delete - OK";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 05A: Click on Save", async function () {
        await util.browser.sleep(5000);
        const b = new Date();
        const elem = await nonUi5.element.getByXPath('//div[@class="action-row"]//a/span[text()="Save"]');
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 05A: Click on Save";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2);
      });
    
    it("Step 06: Open Large Quote", async function () {
        const b = new Date();
        const sUrl = "https://sap-ies-sales-dev.cpq.cloud.sap/Cart/Edit?cartCompositeNumber=002717000079";
        await common.navigation.navigateToUrl(sUrl);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=220000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 06: Open Large Quote";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
        //await util.browser.sleep(20000);
    });
    
    it("Step 06A: Scroll to Line #9", async function () {
        const b = new Date();
        // let elem  = await nonUi5.element.isPresentByXPath(".//*[@id='itemsTable']/tr[9]//button");
        let elem  = await nonUi5.element.getByXPath(".//*[@id='itemsTable']/tr[8]//button");
        await nonUi5.userInteraction.scrollToElement(elem);
    
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 06A: Scroll to Line #9";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    
    it("Step 07: Move to Last Page", async function () {
        await util.browser.sleep(3000);
        const b = new Date();
        //select items
        let elem = await nonUi5.element.getByXPath('//*[@id="cartPager_lastPage"]');
        //await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 07: Move to Last Page";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 08: Clean Up", async function (){
        const b = new Date();
        let mainElem  = await nonUi5.element.isPresentByXPath(".//*[@id='itemsTable']/tr[3]//button");
        if (mainElem) {
            while (mainElem) {
                util.console.log("Line Item found")
                const elem = await nonUi5.element.getByXPath(".//*[@id='itemsTable']/tr[3]//button");
                await nonUi5.userInteraction.scrollToElement(elem);
                await nonUi5.userInteraction.click(elem);
                let elem1 = await nonUi5.element.getByCss("BUTTON[title='Delete']");
                await nonUi5.userInteraction.scrollToElement(elem1);
                await nonUi5.userInteraction.click(elem1);
                const elem2 = await nonUi5.element.getByXPath(".//*[text()='OK']");
                await nonUi5.userInteraction.scrollToElement(elem2);
                await nonUi5.userInteraction.click(elem2);
                await util.browser.sleep(30000);
                util.console.log("Wait - 30 sec");
                mainElem  = await nonUi5.element.isPresentByXPath(".//*[@id='itemsTable']/tr[3]//button");
            }
        } else {
            util.console.log("Line Item NOT found");
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 08: Clean Up";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    
    it("Step 09: Add New Product", async function () {
        const b = new Date();
        const elem = await nonUi5.element.getByCss("INPUT[id='quickAddInput']");
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.clearAndFill(elem, "8007905");
        await util.browser.sleep(750);
        await common.userInteraction.pressEnter();
        await util.browser.sleep(750);
        const addBtn = await nonUi5.element.getByCssContainingText("BUTTON[class*='btn btn-primary fiori3-btn-primary']", "Add");
        await nonUi5.userInteraction.click(addBtn);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 09: Add New Product";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 10: Expand Vertical Menu", async function () {
        const b = new Date();
        let elem = await nonUi5.element.getByXPath('//*[@id="itemsTable"]/tr[3]/td[4]/div/div[1]/div/button');
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 10: Expand Vertical Menu";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 11: Click on Trashcan", async function () {
        await util.browser.sleep(4000);
        const b = new Date();
        let elem = await nonUi5.element.getByCss("BUTTON[title='Delete']");
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 11: Click on Trashcan";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
    it("Step 12: Confirm Delete - OK", async function () {
        const b = new Date();
        let elem = await nonUi5.element.getByXPath('//*[@id="confirmDialogContainer"]/div/div/div[3]/button[3]');
        await nonUi5.userInteraction.scrollToElement(elem);
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.step = "Step 12: Confirm Delete - OK";
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2); 
    });
    
      it("Step 13: Click on Save", async function () {
        await util.browser.sleep(5000);
        const b = new Date();
        const elem = await nonUi5.element.getByXPath('//div[@class="action-row"]//a/span[text()="Save"]');
        await nonUi5.userInteraction.click(elem);
        if (await nonUi5.element.isPresentByCss("div.overlay[style*='display: block']")) {
            await nonUi5.element.waitToBePresent("div.overlay[style*='display: none']",timeout=190000);
        }
        const e = new Date();
        const durationx = (e - b);
        y.duration = durationx;
        y.finishflg = "Y"
        y.step = "Step 13: Click on Save";
        const eoverall = new Date();
        const durationO = (eoverall - boverall);
        y.overalltime = durationO;
        let res = await service.rest.put(payload.octobus.octurl, y, payload.octobus.config2);
      });
      
       
    });
    