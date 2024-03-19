describe("ITDS_742_Cloud_New_Business_Process_Type", function () {
    // Credentials
    const username = browser.config.params.username;
    const password = browser.config.params.passwordCPQ1;

    ////////// Octobus ///////// 
    const testModule = require("./functions/octobus.js");
    testModule.modifyProject('new_business_process_type');
    // Use the functions in your mocha tests like this:
    beforeEach(testModule.beforeTest);
    afterEach(testModule.afterTest);
    // after(testModule.finishTest);
    ////////// End of Octobus Data process ///////// 


    /********************************************************************************************************
     ******************************* START WITH TEST *********************************************************
     *********************************************************************************************************
     Test Name: ITDS_742_Cloud_New_Business_Process_Type
     Step0: Load the Base Quote
     Step0: Switch to iFrame callidus_frame
     Step0: Wait for Quote to be loaded
     Step0: Wait for Quote to be loaded Fluent Wait
     ******************************
     **** Copy the Base Quote *****
     ******************************
     Add Product: 8005605
     Click on Reprice
     Assert 'Unit Qty' equals 0
     Assert 'Spend' equals 0
     Click the product box
     Click Spend
     Fluent Wait and put the input to the box
     Assert Unit Qty change to 1
     Change Spend set to 0
     Assert Unit Qty change back to 0
     Adding Product: 8003707
     Click on Reprice
     Assert 'Unit Qty' equals 0
     Assert 'Spend' equals 0
     Change Spend set to 100
     Assert Unit Qty change to 1
     Change Spend set to 0
     Assert Unit Qty change back to 0
     Add Product: 7003012
     Assert this product spend is not editable
     ********************************************************************************************************/
    const sCloudProduct1 = "8005605";
    const sCloudProduct2 = "8003707";
    const sOnPremiseProduct = "7003012";

    //********************************* Load the Base Quote ************************************
    
    it("Login to CPQ", async function () {
        await cpqQuote.quote1.quote.logInCPQ(testModule.userCredentials.usernameCPQ, testModule.userCredentials.passwordCPQ, "sap");
    });

    it("Load the Quote", async function () {
        await cpqQuote.quote1.quote.handleOpenQuote("206087000008");
    });

    it("Copy Quote", async function () {
        await cpqQuote.quote1.quote.clickCopyQuote();
    });

    it("Wait for copied Quote", async function () {
        await util.browser.sleep(5000);
        await util.browser.refresh();
        await util.browser.sleep(10000);
    });

    //******************************************************************************************
    
    it("Add Product: 8005605", async function () {
        await cpqQuote.quote1.products.clickAddProduct(sCloudProduct1);
    });

    it("01: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("01: Click on Save", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
    }, 141000);

    it("02: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("01: Assert 'Unit Qty' equals 0", async function () {
        const elem = await nonUi5.element.getByXPath(
            `(//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct1}"]]/following-sibling::td[@data-title='Units Qty']//span)[2]`
        );
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        await nonUi5.assertion.expectAttributeToBe(
            elem,
            "0",
            "textContent"
        );
    });

    it("Assert 'Spend' equals 0", async function () {
        const elem = await nonUi5.element.getByXPath(
            `//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct1}"]]/following-sibling::td[@data-title='Spend']//a`
        );
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        await nonUi5.assertion.expectAttributeToBe(
            elem,
            "0.00",
            "textContent"
        );
    });

    it("Click the product box", async function () {
        const elem = await nonUi5.element.getByXPath(
            "//*[@id='quickAddInput']"
        );
        await nonUi5.userInteraction.clear(elem);
    });

    it("Click Spend", async function () {
        const elem = await nonUi5.element.getByXPath(
            `//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct1}"]]/following-sibling::td[@data-title='Spend']//a`
        );
        await nonUi5.userInteraction.click(elem);
    });

    it("03: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("Add 100 to spend for product 8005605", async function () {
        const elem = await nonUi5.element.getByXPath(
            `//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct1}"]]/following-sibling::td[@data-title='Spend']//input`
        );
        await nonUi5.userInteraction.clearAndFill(elem, "100");
        await common.userInteraction.pressEnter();
    });

    it("04: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("Assert Unit Qty change to 1", async function () {
        const elem = await nonUi5.element.getByXPath(
            `(//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct1}"]]/following-sibling::td[@data-title='Units Qty']//span)[2]`
        );
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        await nonUi5.assertion.expectAttributeToBe(
            elem,
            "1",
            "textContent"
        );
    }, 141000);

    it("Change Spend set to 0", async function () {
        const elem = await nonUi5.element.getByXPath(
            `//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct1}"]]/following-sibling::td[@data-title='Spend']//input`
        );
        await nonUi5.userInteraction.clearAndFill(elem, "0");
        await common.userInteraction.pressEnter();
    });

    it("05: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("Assert Unit Qty change back to 0", async function () {
        const elem = await nonUi5.element.getByXPath(
            `(//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct1}"]]/following-sibling::td[@data-title='Units Qty']//span)[2]`
        );
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        await nonUi5.assertion.expectAttributeToBe(
            elem,
            "0",
            "textContent"
        );
    }, 141000);

    it("Adding Product: 8003707", async function () {
        await cpqQuote.quote1.products.clickAddProduct("8003707");
    });

    it("06: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("02: Click on Save", async function () {
        await cpqQuote.quote1.quote.clickSaveQuote();
    });

    it("07: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);

    it("02: Assert 'Unit Qty' equals 0", async function () {
        const elem = await nonUi5.element.getByXPath(
            `(//*[@id='itemsTable']//td[div//span[text()="${sCloudProduct2}"]]/following-sibling::td[@data-title='Units Qty']//span)[2]`
        );
        await nonUi5.userInteraction.scrollToElement(elem, "center");
        await nonUi5.assertion.expectAttributeToBe(
            elem,
            "0",
            "textContent"
        );
    }, 141000);

    it("Add Product: 7003012", async function () {
        await cpqQuote.quote1.products.clickAddProduct("7003012");
    });

    it("08: Wait for Quote to be loaded", async function () {
        await nonUi5.element.waitToBeVisible("BODY");
    }, 141000);
    
    it("Assert this product spend is not editable", async function () {
        const elem = await nonUi5.element.getByXPath(
            `//*[@id='itemsTable']//td[div//span[text()="${sOnPremiseProduct}"]]/following-sibling::td[@data-title='Spend']//span`
        );
        await nonUi5.assertion.expectToBeVisible(elem);
    });
});